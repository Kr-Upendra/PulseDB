import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Base route for pulsedb backend application.",
  });
});

export default app;
