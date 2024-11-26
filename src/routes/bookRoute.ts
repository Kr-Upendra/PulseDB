import { createBook } from "../controllers";
import express from "express";
const router = express.Router();

router.route("/").post(createBook);

export { router as bookRouter };
