import { Response } from "express";
import jwt from "jsonwebtoken";
import slugify from "slugify";

export const generateToken = (
  id: string,
  email: string,
  res: Response,
  expireTime: string = "1d"
) => {
  const secretKey = process.env.JWT_SECRET_KEY!;
  const payload = { _id: id, email };
  const token = jwt.sign(payload, secretKey, {
    expiresIn: expireTime,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt("1d", 10) * 1000,
    sameSite: "strict",
  });

  return token;
};

export const createSlug = (str: string) => {
  return slugify(str, { replacement: "-", lower: true, trim: true });
};
