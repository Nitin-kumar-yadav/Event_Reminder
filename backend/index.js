import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/db.js";
import cors from "cors";
import router from "./router/user.routes.js";

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
app.use("/api/v1", router);

app.listen(PORT, () => {
  try {
    console.log(`http://localhost:${PORT}`);
    connectDB();
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
