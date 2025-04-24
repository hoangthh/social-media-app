import express from "express";
import {
  createChat,
  getChatsByUserId,
  updateIsReadLastMessage,
} from "../controllers/chats.js";

const router = express.Router();

//PATH: /chats

router.get("/:userId", getChatsByUserId);

router.post("/", createChat);

router.put("/read/:chatId", updateIsReadLastMessage);

export default router;
