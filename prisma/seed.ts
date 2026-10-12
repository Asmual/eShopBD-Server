import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Neon Database seeding for eShopBD...");

  // 1. Create or ensure Default Admin & Seller Users
  const hashedPassword = await bcrypt.hash("Admin@123456", 10);

  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@eshopbd.com" },
    update: {},
    create: {
      email: "seller@eshopbd.com",
      passwordHash: hashedPassword,
      phone: "01700000001",
      role: "SELLER",
      isVerified: true,
      profile: {
        create: {
          fullName: "eShopBD Official Merchant",
          city: "Dhaka",
          district: "Dhaka",
        },
      },
      sellerStore: {
        create: {
          storeName: "eShopBD Official Store",
          slug: "eshopbd-official-store",
          businessEmail: "seller@eshopbd.com",
          businessPhone: "01700000001",
          isVerified: true,
          rating: 4.9,
          description: "Verified primary flagship vendor of eShopBD.",
        },
      },
    },
    include: {
      sellerStore: true,
    },
  });

  const sellerStore = sellerUser.sellerStore!;
  console.log(`✅ Seller Store created: ${sellerStore.storeName}`);

  // 2. Categories
  const categoriesData = [
    { name: "Electronics", slug: "electronics", icon: "Tv", image: "/images/categories/category-electronics.jpg" },
    { name: "Toys & Kids", slug: "toys-kids", icon: "Baby", image: "/images/all products/toys/Toys- (1).jpg" },
    { name: "Fashion", slug: "fashion", icon: "Shirt", image: "/images/categories/category-men2.jpg" },
    { name: "Grocery", slug: "grocery", icon: "ShoppingBasket", image: "/images/categories/category-grocery.jpg" },
    { name: "Home & Kitchen", slug: "home-kitchen", icon: "Home", image: "/images/categories/category-home.jpg" },
    { name: "Health & Fitness", slug: "health-fitness", icon: "HeartPulse", image: "/images/categories/category-health.jpg" },
    { name: "Sports", slug: "sports", icon: "Dumbbell", image: "/images/categories/category-sports.jpg" },
    { name: "Books", slug: "books", icon: "BookOpen", image: "/images/categories/category-books.jpg" },
    { name: "Jewelry", slug: "jewelry", icon: "Gem", image: "/images/categories/category-jewelry.jpg" },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image, icon: cat.icon },
      create: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        image: cat.image,
        description: `Explore top rated products in ${cat.name}.`,
      },
    });
    categoryMap.set(c.slug, c.id);
  }
  console.log(`✅ Seeded ${categoryMap.size} categories.`);

  // 3. Products: Electronics & Toys
  const productsData = [
    // --- Electronics ---
    {
      name: "beFree Sound 2.1 Channel Bluetooth Multi-Media Speaker System",
      slug: "befree-sound-2-1-channel-bluetooth-speaker",
      categorySlug: "electronics",
      price: 5490,
      originalPrice: 7200,
      discountPercent: 24,
      rating: 4.8,
      reviewsCount: 142,
      soldCount: 420,
      stock: 45,
      sku: "EL-SPK-001",
      badge: "24% OFF",
      isMegaDeal: true,
      image: "/images/all products/electronics/electronics-1.jpg",
      description: "Deep bass subwoofer system with dual satellite drivers, wireless Bluetooth streaming, USB/SD playback.",
    },
    {
      name: "30,000mAh Ultra-Fast PD 65W Power Bank with Digital Display",
      slug: "30000mah-ultra-fast-pd-power-bank",
      categorySlug: "electronics",
      price: 2850,
      originalPrice: 3800,
      discountPercent: 25,
      rating: 4.9,
      reviewsCount: 380,
      soldCount: 1650,
      stock: 80,
      sku: "EL-PB-002",
      badge: "HOT",
      isBestSeller: true,
      isMegaDeal: true,
      image: "/images/all products/electronics/electronics-2.jpg",
      description: "Massive 30000mAh capacity with 4 integrated braided output cables, LED digital battery indicator.",
    },
    {
      name: "Zebronics 2.1 BT Multimedia Home Theater Speaker System",
      slug: "zebronics-2-1-bt-multimedia-speaker",
      categorySlug: "electronics",
      price: 4750,
      originalPrice: 6100,
      discountPercent: 22,
      rating: 4.7,
      reviewsCount: 215,
      soldCount: 890,
      stock: 35,
      sku: "EL-SPK-003",
      badge: "22% OFF",
      isBestSeller: true,
      image: "/images/all products/electronics/electronics-3.jpg",
      description: "Room-filling audio fidelity with front rotary volume, bass and treble controls, digital clock display.",
    },
    {
      name: "45W Super Fast PD Type-C Wall Charger with 3M Cable",
      slug: "45w-super-fast-pd-type-c-charger",
      categorySlug: "electronics",
      price: 1150,
      originalPrice: 1650,
      discountPercent: 30,
      rating: 4.8,
      reviewsCount: 510,
      soldCount: 2100,
      stock: 120,
      sku: "EL-CHG-004",
      badge: "NEW",
      isNewArrival: true,
      image: "/images/all products/electronics/electronics-4.jpg",
      description: "Ultra-compact GaN fast charging adapter supporting Power Delivery 3.0 with heavy-duty 3-meter cable.",
    },
    {
      name: "Sony SRS-XB13 Extra Bass Wireless Compact Speaker (Forest Green)",
      slug: "sony-srs-xb13-extra-bass-speaker-green",
      categorySlug: "electronics",
      price: 4950,
      originalPrice: 6200,
      discountPercent: 20,
      rating: 4.9,
      reviewsCount: 640,
      soldCount: 1840,
      stock: 50,
      sku: "EL-SPK-008",
      badge: "ORIGINAL",
      isBestSeller: true,
      isMegaDeal: true,
      image: "/images/all products/electronics/electronics-8.jpg",
      description: "Original Sony Sound Diffusion Processor with Extra Bass, IP67 waterproof and dustproof rating.",
    },
    {
      name: "JBL Tune 510BT Pure Bass Wireless Bluetooth Headphones",
      slug: "jbl-tune-510bt-wireless-headphones",
      categorySlug: "electronics",
      price: 4200,
      originalPrice: 5500,
      discountPercent: 24,
      rating: 4.9,
      reviewsCount: 820,
      soldCount: 2750,
      stock: 65,
      sku: "EL-HPH-009",
      badge: "BEST SELLER",
      isBestSeller: true,
      image: "/images/all products/electronics/electronics-9.jpg",
      description: "Renowned JBL Pure Bass sound with seamless multipoint Bluetooth 5.0 connection, 40-hour battery life.",
    },

    // --- Toys & Kids ---
    {
      name: "Educational Talking Flash Cards & Audio Learning Device",
      slug: "educational-talking-flash-cards-device",
      categorySlug: "toys-kids",
      price: 850,
      originalPrice: 1250,
      discountPercent: 32,
      rating: 4.8,
      reviewsCount: 160,
      soldCount: 520,
      stock: 90,
      sku: "TY-EDU-001",
      badge: "32% OFF",
      isNewArrival: true,
      image: "/images/all products/toys/Toys- (1).jpg",
      description: "Early childhood interactive English learning device with 112 double-sided talking flashcards.",
    },
    {
      name: "Die-Cast Alloy High-Speed Racing Sports Car Set (6 Pcs)",
      slug: "die-cast-alloy-racing-sports-car-set",
      categorySlug: "toys-kids",
      price: 1450,
      originalPrice: 1950,
      discountPercent: 26,
      rating: 4.9,
      reviewsCount: 240,
      soldCount: 890,
      stock: 60,
      sku: "TY-RC-002",
      badge: "HOT",
      isBestSeller: true,
      isMegaDeal: true,
      image: "/images/all products/toys/Toys- (2).jpg",
      description: "Aerodynamic metallic sports cars with pull-back friction motors, shock suspension, and authentic gloss livery.",
    },
    {
      name: "Electric Rechargeable Interactive Smart Dancing Robot with Music",
      slug: "electric-interactive-smart-dancing-robot",
      categorySlug: "toys-kids",
      price: 1850,
      originalPrice: 2600,
      discountPercent: 29,
      rating: 4.8,
      reviewsCount: 310,
      soldCount: 1100,
      stock: 40,
      sku: "TY-BOT-003",
      badge: "BEST SELLER",
      isBestSeller: true,
      image: "/images/all products/toys/Toys- (3).jpg",
      description: "360-degree rotating acrobatic robot with vibrant LED face glow, dynamic dance rhythms.",
    },
    {
      name: "2.4GHz High-Speed RC Monster Truck 4WD Off-Road Buggy",
      slug: "2-4ghz-high-speed-rc-monster-truck-4wd",
      categorySlug: "toys-kids",
      price: 2750,
      originalPrice: 3800,
      discountPercent: 28,
      rating: 4.8,
      reviewsCount: 380,
      soldCount: 1200,
      stock: 35,
      sku: "TY-RC-006",
      badge: "HOT DEAL",
      isBestSeller: true,
      image: "/images/all products/toys/Toys- (6).jpg",
      description: "All-terrain independent coil suspension with grippy rubber tread tires and dual waterproof motors.",
    },
    {
      name: "Kids Digital Instant Print Camera with Thermal Paper & Dual Lenses",
      slug: "kids-digital-instant-print-camera-dual-lens",
      categorySlug: "toys-kids",
      price: 3200,
      originalPrice: 4500,
      discountPercent: 29,
      rating: 4.9,
      reviewsCount: 510,
      soldCount: 1620,
      stock: 55,
      sku: "TY-CAM-012",
      badge: "TRENDING",
      isBestSeller: true,
      isMegaDeal: true,
      image: "/images/all products/toys/Toys- (12).jpg",
      description: "Zero-ink thermal paper instant photo printing with 1080p video recording and rechargeable battery.",
    },
  ];

  for (const prod of productsData) {
    const categoryId = categoryMap.get(prod.categorySlug);
    if (!categoryId) continue;

    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        price: prod.price,
        originalPrice: prod.originalPrice,
        stock: prod.stock,
      },
      create: {
        sellerStoreId: sellerStore.id,
        categoryId: categoryId,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        originalPrice: prod.originalPrice,
        discountPercent: prod.discountPercent,
        stock: prod.stock,
        sku: prod.sku,
        badge: prod.badge,
        isMegaDeal: Boolean(prod.isMegaDeal),
        isBestSeller: Boolean(prod.isBestSeller),
        isNewArrival: Boolean(prod.isNewArrival),
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        soldCount: prod.soldCount,
        images: {
          create: [
            {
              url: prod.image,
              isPrimary: true,
              sortOrder: 0,
            },
          ],
        },
      },
    });
    console.log(`  📦 Product seeded: ${createdProduct.name}`);
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
