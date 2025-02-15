import express from "express";
import { createComment, getCommentsByPostId } from "../controllers/comments.js";

const router = express.Router();

//PATH: /comments

router.get("/:postId", getCommentsByPostId);

router.post("/", createComment);

export default router;
