import express from "express";
import { createMessage, getMessagesByChatId } from "../controllers/messages.js";

const router = express.Router();

//PATH: /message

router.get("/:chatId", getMessagesByChatId);

router.post("/", createMessage);

export default router;
