import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error", error);
  const statusCode = error.statusCode || 500;
  const status = error.status;
  const message = error.message || "Something went wrong.";
  res.status(statusCode).json({
    status: status,
    message,
  });
};
