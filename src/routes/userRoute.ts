import { protect } from "../middlewares";
import { getProfile } from "../controllers";
import express from "express";
const router = express.Router();

router.route("/profile").get(protect, getProfile);

export { router as userRouter };
