import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFound.js";

export const createApp = (): Application => {
  const app = express();

  // Allowed origins including local dev, production frontend, and Vercel previews
  const allowedOrigins = [
    ENV.CLIENT_URL,
    "http://localhost:3000",
    "https://e-shop-bd-gamma.vercel.app",
  ];

  // Middleware pipeline
  app.use(
    cors({
      origin: (origin, callback) => {
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          origin.endsWith(".vercel.app")
        ) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  if (ENV.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // API Routes
  app.use("/api", apiRouter);

  // 404 & Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
