import express from "express";
import { createChat, getChatsByUserId } from "../controllers/chat.js";

const router = express.Router();

//PATH: /chat

router.post("/", createChat);
router.get("/:userId", getChatsByUserId);

export default router;
