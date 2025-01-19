import express from "express";
import { getUser } from "../controllers/user.js";
import middleware from "../middleware/index.js";

const router = express.Router();

//PATH: /user

router.get("/", middleware.authenticateToken, getUser);

export default router;
