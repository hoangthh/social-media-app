import express from "express";
import {
  createMessage,
  getMessagesByChatId,
  markLastSentMessageAsSeen,
} from "../controllers/messages.js";

const router = express.Router();

//PATH: /messages

router.get("/:chatId", getMessagesByChatId);

router.post("/", createMessage);

router.put("/is-seen", markLastSentMessageAsSeen);

export default router;
