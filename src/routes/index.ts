import { Router } from "express";
import { healthRoutes } from "./health.routes.js";
import { productRoutes } from "./product.routes.js";
import { categoryRoutes } from "./category.routes.js";

const rootRouter = Router();

// Mount API routes
rootRouter.use("/health", healthRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/categories", categoryRoutes);

// Root API info endpoint
rootRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to eShopBD Multi-Vendor Marketplace API (v1)",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      categories: "/api/categories",
    },
  });
});

export const apiRouter = rootRouter;
