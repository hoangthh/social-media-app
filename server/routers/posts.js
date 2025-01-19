import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";
import { reactPost } from "../controllers/reaction.js";

const router = express.Router();

//PATH: /posts

router.get("/", getPosts);

router.post("/", createPost);

router.post("/update", updatePost);

router.post("/react", reactPost);

export default router;
