import { protect } from "../middlewares";
import { getProfile } from "../controllers";
import express from "express";
export const userRoute = express.Router();

userRoute.route("/profile").get(protect, getProfile);
