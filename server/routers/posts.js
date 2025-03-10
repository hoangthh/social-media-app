import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";
import { upload } from "../middleware/middleware.js";

const router = express.Router();

//PATH: /posts

router.get("/", getPosts);

router.post("/", upload.single("attachment"), createPost);

router.put("/:postId", upload.single("attachment"), updatePost);

export default router;
