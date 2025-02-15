import express from "express";
import { createChat, getChatsByUserId } from "../controllers/chats.js";

const router = express.Router();

//PATH: /chats

router.get("/:userId", getChatsByUserId);

router.post("/", createChat);

export default router;
