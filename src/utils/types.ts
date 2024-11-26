import { Request } from "express";

export interface ResponsePayload {
  status: string;
  message: string;
  data?: any;
}

export interface IRegisterBody {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user?: any;
}
