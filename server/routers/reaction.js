import express from "express";
import {
  getReactionPost,
  createReactionPost,
} from "../controllers/reaction.js";

const router = express.Router();

//PATH: /reaction

router.get("/post/:postId", getReactionPost);

router.post("/post", createReactionPost);

// router.post("/comment/:commentId", getReactionComment);

// router.post("/comment", createReactionComment);

export default router;
