import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js";
import { Prisma } from "@prisma/client";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, search, sortBy, limit = "50", page = "1" } = req.query;

    const take = Math.min(Math.max(parseInt(limit as string, 10) || 50, 1), 100);
    const skip = (Math.max(parseInt(page as string, 10) || 1, 1) - 1) * take;

    const where: Prisma.ProductWhereInput = {};

    if (category && category !== "all") {
      where.category = {
        slug: String(category),
      };
    }

    if (search && String(search).trim()) {
      const q = String(search).trim();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

    if (sortBy === "price-low") {
      orderBy = { price: "asc" };
    } else if (sortBy === "price-high") {
      orderBy = { price: "desc" };
    } else if (sortBy === "rating") {
      orderBy = { rating: "desc" };
    } else if (sortBy === "popular") {
      orderBy = { soldCount: "desc" };
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          images: {
            where: { isPrimary: true },
            select: { url: true },
            take: 1,
          },
        },
      }),
    ]);

    // Format for frontend convenience
    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || undefined,
      discountPercent: p.discountPercent || undefined,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      soldCount: p.soldCount,
      stock: p.stock,
      inStock: p.stock > 0,
      badge: p.badge || undefined,
      isMegaDeal: p.isMegaDeal,
      isBestSeller: p.isBestSeller,
      isNewArrival: p.isNewArrival,
      category: p.category.slug,
      categoryName: p.category.name,
      image: p.images[0]?.url || "/images/categories/category-electronics.jpg",
    }));

    res.json({
      success: true,
      data: formatted,
      meta: {
        total,
        page: Math.floor(skip / take) + 1,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug: String(slug) },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        sellerStore: {
          select: {
            id: true,
            storeName: true,
            slug: true,
            rating: true,
            isVerified: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.json({
      success: true,
      data: {
        ...product,
        image: product.images[0]?.url || "/images/categories/category-electronics.jpg",
      },
    });
  } catch (err) {
    next(err);
  }
};
