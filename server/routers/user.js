import express from "express";
import { getUser } from "../controllers/user.js";
import { authenticateToken } from "../middleware/middleware.js";

const router = express.Router();

//PATH: /user

router.get("/", authenticateToken, getUser);

export default router;
