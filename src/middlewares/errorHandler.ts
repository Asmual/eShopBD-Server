import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${req.method} ${req.url} - ${message}`);
  if (err.stack && process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || null,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
