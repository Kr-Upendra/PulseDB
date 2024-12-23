import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express-serve-static-core";
import { asyncHandler, CustomRequest, ErrorHandler } from "../utils";
import { UserModel } from "../models";

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new ErrorHandler("You are not logged! Please log in again.", 401)
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

    if (!freshUser.isActive) {
      return next(
        new ErrorHandler(
          "Your account has been deleted or deactivated. Please contact support if you believe this is an error.",
          400
        )
      );
    }

    const user = {
      id: freshUser.id,
      email: freshUser.email,
      name: freshUser.fullName,
      role: freshUser.role,
    };

    req.user = user;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role!)) {
      return next(
        new ErrorHandler(
          "You do not have the necessary permissions to access this resource.",
          403
        )
      );
    }
    next();
  };
};
