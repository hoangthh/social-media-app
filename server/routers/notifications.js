import express from "express";
import {
  getNotifications,
  createNotification,
} from "../controllers/notifications.js";

const router = express.Router();

//PATH: /notifications

router.get("/:userId", getNotifications);

router.post("/", createNotification);

export default router;
