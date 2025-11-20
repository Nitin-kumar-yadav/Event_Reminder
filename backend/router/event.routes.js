import express from "express";
import { createEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create/event", protectRoute, createEvent);

export default router;
