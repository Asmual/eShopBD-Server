import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default_access_secret",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
};
