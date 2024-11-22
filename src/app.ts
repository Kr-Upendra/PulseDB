import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "success", message: "Hello World from Express!" });
});

export default app;
