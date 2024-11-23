import { NextFunction, Request, Response } from "express";
import { asyncHandler, ResponsePayload } from "../utils";

export const getProfile = asyncHandler(
  async (
    req: Request,
    res: Response<ResponsePayload>,
    next: NextFunction
  ): Promise<void> => {
    res.status(200).json({
      status: "success",
      message: "Get user profile.",
    });
  }
);
