import express from "express";
import {
  checkAuth,
  logIn,
  logOut,
  signUp,
  verifyEmail,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.post("/verify-email", verifyEmail);
router.get("/check-auth", protectRoute, checkAuth);

export default router;
