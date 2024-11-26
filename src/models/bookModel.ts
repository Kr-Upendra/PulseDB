import { Schema, model, Types } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
    },
    poster: { type: [String], default: [] },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    genre: { type: String, default: "story", lower: true },
    stock: { type: Number, default: 0, min: 0 },
    language: { type: String, default: "" },
    pages: { type: Number, default: 0 },
    releaseYear: { type: Number, min: 500, max: new Date().getFullYear() + 5 },
    addedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export const BookModel = model("Book", bookSchema);

/*

"description": "Pride and Prejudice, written by Jane Austen, is a romantic novel that follows the turbulent relationship between Elizabeth Bennet and the wealthy, aloof Mr. Darcy. The novel addresses issues of class, marriage, and societal expectations.",
    "author": "Test Author",
    "price": 249,
    "genre": "test",
    "releaseYear": 2024,
    "stock": 50,
    "language": "Hindi",
    "pages": 100

*/
