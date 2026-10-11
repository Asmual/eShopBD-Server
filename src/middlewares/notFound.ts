import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: [${req.method}] ${req.originalUrl}`,
  });
};
