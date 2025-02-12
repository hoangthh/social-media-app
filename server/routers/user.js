import express from "express";
import { getUser, getUserByName, getUserById } from "../controllers/user.js";
import { authenticateToken } from "../middleware/middleware.js";

const router = express.Router();

//PATH: /user

router.get("/", authenticateToken, getUser);
router.get("/search", getUserByName);
router.get("/:userId", getUserById);

export default router;
