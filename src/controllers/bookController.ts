import { NextFunction, Response } from "express";
import { BookModel } from "../models";
import {
  asyncHandler,
  createSlug,
  CustomRequest,
  ErrorHandler,
  ICreateBookData,
} from "../utils";

export const createBook = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      author,
      price,
      genre,
      poster,
      releaseYear,
      stock,
      pages,
      language,
    }: ICreateBookData = req.body;

    if (!title || !description || !author || !price)
      return next(
        new ErrorHandler(
          "Invalid input. please provide title, description, author and price.",
          400
        )
      );

    const slug = createSlug(title);

    const doesExist = await BookModel.findOne({ slug });
    if (doesExist)
      return next(new ErrorHandler("Book already exists in record.", 400));

    const newBook = new BookModel({
      title,
      slug,
      description,
      author,
      price,
      genre,
      poster,
      releaseYear,
      stock,
      pages,
      language,
      addedBy: req.user.id,
    });

    await newBook.save();

    res.status(201).json({
      status: "success",
      message: "New book added.",
    });
  }
);
