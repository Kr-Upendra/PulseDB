import express from "express";
import { protect, restrictTo } from "../middlewares";
import { createBook, updateBook } from "../controllers";
const router = express.Router();

router.route("/").post(protect, restrictTo("admin"), createBook);
router
  .route("/:bookId")
  .patch(protect, restrictTo("admin", "moderator"), updateBook);

export { router as bookRouter };
