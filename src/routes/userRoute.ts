import { loginUser, registerUser } from "../controllers";
import express from "express";
export const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
