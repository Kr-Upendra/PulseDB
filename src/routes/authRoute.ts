import { loginUser, registerUser } from "../controllers";
import express from "express";
export const authRoute = express.Router();

authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);
