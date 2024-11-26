import { createPost } from "../controllers";
import express from "express";
export const postRoute = express.Router();

postRoute.route("/").post(createPost);
