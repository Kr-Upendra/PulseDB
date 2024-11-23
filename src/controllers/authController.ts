import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../models";
import {
  generateToken,
  ILoginBody,
  IRegisterBody,
  ResponsePayload,
} from "../utils";

export const registerUser = async (
  req: Request,
  res: Response<ResponsePayload>
): Promise<any> => {
  const { name, email, password }: IRegisterBody = req.body;

  if (!name || !email || !password)
    return res.status(400).json({
      status: "failed",
      message: "Invalid input.",
    });

  try {
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists)
      return res.status(400).json({
        status: "failed",
        message: "User with email already exists.",
      });

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      status: "success",
      message: "User register successfully.",
      data: { user: { _id: user._id, email: user.email, name: user.name } },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error?.message || "Something went wrong.",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response<ResponsePayload>
): Promise<any> => {
  const { email, password }: ILoginBody = req.body;

  if (!email || !password)
    return res.status(400).json({
      status: "failed",
      message: "Invalid input.",
    });

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password.",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password.",
      });

    const token = generateToken(user._id.toString(), user.email);

    const data = {
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt("1d", 10) * 1000,
      sameSite: "strict",
    });

    return res.status(200).json({
      status: "success",
      message: "You are logged in successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error?.message || "Something went wrong.",
    });
  }
};
