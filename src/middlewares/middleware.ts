import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorHandler } from "../utils";

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("doceded", decoded);
    // const freshUser = await UserModel.findById(decoded._id).exec();

    // if (!freshUser)
    //   return res.status(STATUS_CODES.UNAUTHORIZED).json({
    //     status: "failed",
    //     message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
    //   });

    // if (freshUser.changedPasswordAfter(decoded.iat))
    //   return res.status(STATUS_CODES.UNAUTHORIZED).json({
    //     status: "failed",
    //     message: API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
    //   });

    // const user = {
    //   id: freshUser.id,
    //   email: freshUser.email,
    //   firstname: freshUser.firstName,
    //   lastname: freshUser.lastName,
    //   role: freshUser.userRole,
    // };

    // req.user = user;
    next();
  }
);

// export const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req?.user?.role)) {
//       return res.status(STATUS_CODES.FORBIDDEN).json({
//         status: "failed",
//         message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
//       });
//     }
//     next();
//   };
// };

// } catch (err) {
//   console.log("error from middleware", err?.name);
//   if (err?.name === "TokenExpiredError")
//     return res.status(401).json({
//       status: "failed",
//       message: "Access denied due to expired token.",
//     });
// }
