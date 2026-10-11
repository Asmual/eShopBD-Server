import { Router, Request, Response } from "express";
import { prisma } from "../config/db.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  let dbStatus = "disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "connected";
  } catch {
    dbStatus = "not_configured_or_offline";
  }

  res.status(200).json({
    success: true,
    message: "eShopBD API Server is running smoothly",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      provider: "postgresql",
      status: dbStatus,
    },
  });
});

export const healthRoutes = router;
