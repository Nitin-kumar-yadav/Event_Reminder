import express from "express";
import {
  createEvent,
  deleteEvent,
  editEvent,
  viewEvent,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/event/create", protectRoute, createEvent);
router.get("/event/:userId", protectRoute, viewEvent);
router.put("/event/update/:eventId", protectRoute, editEvent);
router.delete("/event/delete/:eventId", protectRoute, deleteEvent);

export default router;
