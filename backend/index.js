import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/db.js";
import cors from "cors";
import authRouter from "./router/user.routes.js";
import eventRouter from "./router/event.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRouter);
app.use("/api/v1", eventRouter);

app.listen(PORT, () => {
  try {
    console.log(`http://localhost:${PORT}`);
    connectDB();
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
