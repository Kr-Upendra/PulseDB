import express, { Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./routes";

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Base route for pulsedb backend application.",
  });
});

app.use("/auth", userRoute);

export default app;
