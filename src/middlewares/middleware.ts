import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorHandler } from "../utils";
import { UserModel } from "../models";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new ErrorHandler(
          "You are not logged! Please log in to get access!",
          401
        )
      );

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    const freshUser = await UserModel.findById(decoded._id).exec();

    if (!freshUser)
      return next(
        new ErrorHandler(
          "User not found. Please ensure the token is valid.",
          401
        )
      );

    const user = {
      id: freshUser.id,
      email: freshUser.email,
      name: freshUser.name,
      role: "user",
    };

    req.user = user;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role!)) {
      return next(new ErrorHandler("You do not have access.", 403));
    }
    next();
  };
};
