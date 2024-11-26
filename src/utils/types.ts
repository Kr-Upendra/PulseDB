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

export interface ICreateBookData {
  title: string;
  description: string;
  author: string;
  price: number;
  poster?: string;
  genre?: string;
  stock?: number;
  pages?: number;
  language?: string;
  releaseYear?: number;
}

export interface IUpdateBookData {
  title?: string;
  description?: string;
  author?: string;
  price?: number;
  poster?: string;
  genre?: string;
  stock?: number;
  releaseYear?: number;
  pages?: number;
  language?: string;
}
