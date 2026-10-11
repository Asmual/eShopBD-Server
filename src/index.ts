import { createApp } from "./app.js";
import { ENV } from "./config/env.js";
import { prisma } from "./config/db.js";

const app = createApp();

const server = app.listen(ENV.PORT, () => {
  console.log(`
=====================================================
🚀 eShopBD Server running on: http://localhost:${ENV.PORT}
📡 Environment: ${ENV.NODE_ENV}
🩺 Health Check: http://localhost:${ENV.PORT}/api/health
=====================================================
  `);
});

// Graceful shutdown handling
const handleGracefulShutdown = async (signal: string) => {
  console.log(`\n[${signal}] Initiating graceful shutdown...`);
  server.close(async () => {
    console.log("Http server closed.");
    try {
      await prisma.$disconnect();
      console.log("Prisma client disconnected.");
    } catch (e) {
      console.error("Error during prisma disconnect:", e);
    }
    process.exit(0);
  });
};

process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));
process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
