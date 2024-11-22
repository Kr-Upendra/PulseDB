import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({ credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "success", message: "Hello World from Express!" });
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
