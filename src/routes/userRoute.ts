import { protect } from "../middlewares";
import { getProfile, loginUser, registerUser } from "../controllers";
import express from "express";
export const userRoute = express.Router();

userRoute.route("/profile").get(protect, getProfile);

userRoute.route("/auth/register").post(registerUser);
userRoute.route("/auth/login").post(loginUser);
