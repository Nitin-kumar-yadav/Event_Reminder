import express from "express";
import { createEvent } from "../controllers/event.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create/event", protectRoute, createEvent);

export default router;
