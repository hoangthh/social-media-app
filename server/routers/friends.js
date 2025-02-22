import express from "express";
import {
  getFriends,
  getMutualFriends,
  createFriendRequest,
  updateFriendRequest,
  deleteFriendRequest,
} from "../controllers/friends.js";

const router = express.Router();

//PATH: /friends

router.get("/:userId", getFriends);

router.get("/mutual/:userId", getMutualFriends);

router.post("/", createFriendRequest);

router.put("/:requestId", updateFriendRequest);

router.delete("/:requestId", deleteFriendRequest);

export default router;
