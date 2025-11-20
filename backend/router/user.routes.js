import express from "express";
import { logIn, logOut, signUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

export default router;
