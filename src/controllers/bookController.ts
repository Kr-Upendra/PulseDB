import { NextFunction, Response } from "express";
import { BookModel } from "../models";
import {
  asyncHandler,
  createSlug,
  CustomRequest,
  ErrorHandler,
  ICreateBookData,
  IUpdateBookData,
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
      message: "New book added successfully.",
    });
  }
);

export const updateBook = asyncHandler(
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

    const { bookId } = req.params;

    const existingBook = await BookModel.findById(bookId);
    if (!existingBook) {
      return next(new ErrorHandler("Book not found.", 404));
    }

    let slug = existingBook.slug;
    if (title && title !== existingBook.title) slug = createSlug(title);

    const updatedData: any = {
      title: title || existingBook.title,
      slug,
      description: description || existingBook.description,
      author: author || existingBook.author,
      price: price || existingBook.price,
      genre: genre || existingBook.genre,
      poster: poster || existingBook.poster,
      releaseYear: releaseYear || existingBook.releaseYear,
      stock: stock || existingBook.stock,
      pages: pages || existingBook.pages,
      language: language || existingBook.language,
      updatedBy: req.user.id,
    };

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return next(new ErrorHandler("Failed to update the book.", 500));
    }

    res.status(200).json({
      status: "success",
      message: "Book updated successfully.",
      data: updatedBook,
    });
  }
);
