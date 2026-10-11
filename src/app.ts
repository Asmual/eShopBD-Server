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

  // Middleware pipeline
  app.use(
    cors({
      origin: [ENV.CLIENT_URL, "http://localhost:3000"],
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
