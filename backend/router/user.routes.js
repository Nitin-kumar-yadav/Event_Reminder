import express from "express";
import { logIn, logOut, signUp } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/check-auth", protectRoute, (req, res) => {
  return res.status(200).json({ user: req.user || null });
});

export default router;
