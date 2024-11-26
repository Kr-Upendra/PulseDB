import { NextFunction, Response } from "express";
import { BookModel } from "../models";
import { asyncHandler, CustomRequest, ErrorHandler } from "../utils";

export const createBook = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { text, media } = req.body;
    if (!text) return next(new ErrorHandler("Invalid input.", 400));

    if (!req?.user)
      return next(new ErrorHandler("User is not authenticated.", 401));

    const userId = req?.user?.id;
    console.log({ userId });

    const newPost = new BookModel({ text, media, creator: userId });
    console.log(newPost);

    res.status(201).json({
      status: "failed",
      message: "New book added.",
    });
  }
);
