import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI || "";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToMongoDB();

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

startServer();
