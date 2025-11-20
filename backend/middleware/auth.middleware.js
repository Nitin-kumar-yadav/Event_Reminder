import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel";

dotenv.config({});

export const protectRoute = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    res
      .status(503)
      .json({ message: "JWT SECRET is not available in enviroment file" });
  }

  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.staus(403).json({ message: "Unauthorized-- No token provided" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).json({ message: "Unauthorized-- User" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware error ", error);
    res.status(500).json({ message: "Auth middleware is not working" });
  }
};
