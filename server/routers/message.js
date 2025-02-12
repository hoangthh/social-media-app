import express from "express";
import { createMessage, getMessagesByChat } from "../controllers/message.js";

const router = express.Router();

//PATH: /message

// Lấy lịch sử tin nhắn giữa 2 user
router.post("/", createMessage);
router.get("/:chatId", getMessagesByChat);

export default router;
