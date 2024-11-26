import { NextFunction, Response } from "express";
import {
  asyncHandler,
  CustomRequest,
  ErrorHandler,
  ResponsePayload,
} from "../utils";
import { UserModel } from "../models";

export const getProfile = asyncHandler(
  async (
    req: CustomRequest,
    res: Response<ResponsePayload>,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user.id;
    const userProfile = await UserModel.findById(userId);

    if (!userProfile || !userProfile.isActive)
      return next(new ErrorHandler("User does not exist!", 400));

    res.status(200).json({
      status: "success",
      message: "Get user profile.",
      data: { user: userProfile },
    });
  }
);
