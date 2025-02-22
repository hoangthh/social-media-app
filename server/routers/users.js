import express from "express";
import { getUser, getUserByName, getUserById } from "../controllers/users.js";

const router = express.Router();

//PATH: /users

router.get("/me", getUser);

router.get("/search", getUserByName);

router.get("/:userId", getUserById);

export default router;
