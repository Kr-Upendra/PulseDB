import { NextFunction, Request, Response } from "express";
import { ResponsePayload } from "utils";

export const getProfile = async (
  req: Request,
  res: Response<ResponsePayload>,
  next: NextFunction
): Promise<any> => {
  return res.status(200).json({
    status: "success",
    message: "Get user profile.",
  });
};
