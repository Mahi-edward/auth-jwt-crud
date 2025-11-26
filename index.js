import express from "express";
import { ENV } from "./config/index.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(helmet);
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello Mahesh");
});

app.listen(ENV.port, () => {
  console.log(`Server listening on port ${ENV.port}`);
});
