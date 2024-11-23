import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { userRoute } from "./routes";
import { ErrorHandler } from "./utils";
import { globalErrorHandler } from "./controllers";

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

app.use("/users", userRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
