import express from "express";
import { protect, restrictTo } from "../middlewares";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers";
const router = express.Router();

router
  .route("/")
  .get(protect, getBooks)
  .post(protect, restrictTo("admin"), createBook);

router
  .route("/:bookId")
  .get(protect, getBook)
  .patch(protect, restrictTo("admin", "moderator"), updateBook)
  .delete(protect, restrictTo("admin"), deleteBook);

export { router as bookRouter };
