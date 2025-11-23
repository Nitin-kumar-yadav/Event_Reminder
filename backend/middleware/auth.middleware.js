import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT SECRET is not defined" });
    }

    const token = req.cookies?.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token Expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid Signature" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
