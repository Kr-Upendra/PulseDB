import express from "express";
import { protect, restrictTo } from "../middlewares";
import { createBook } from "../controllers";
const router = express.Router();

router.route("/").post(protect, restrictTo("admin"), createBook);

export { router as bookRouter };
