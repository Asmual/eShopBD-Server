import { Router } from "express";
import { healthRoutes } from "./health.routes.js";

const rootRouter = Router();

// Mount API routes
rootRouter.use("/health", healthRoutes);

// Placeholder routes for future implementation
rootRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to eShopBD Multi-Vendor Marketplace API (v1)",
    docs: "/api/health",
  });
});

export const apiRouter = rootRouter;
