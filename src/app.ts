import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandler } from "./utils";
import { globalErrorHandler } from "./controllers";
import { authRouter, bookRouter, userRouter } from "./routes";

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Base route for pulsedb backend application.",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", bookRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(
    new ErrorHandler(`Can't find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
