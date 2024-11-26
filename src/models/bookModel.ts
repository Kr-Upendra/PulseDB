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
    genre: { type: String },
    stock: { type: Number, default: 0, min: 0 },
    releaseYear: { type: Number, min: 500, max: new Date().getFullYear() + 5 },
    addedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const BookModel = model("Book", bookSchema);
