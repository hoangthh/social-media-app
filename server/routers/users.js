import express from "express";
import { getUser, getUserByName, getUserById } from "../controllers/users.js";

const router = express.Router();

//PATH: /user

router.get("/me", getUser);

router.get("/:userId", getUserById);

router.get("/search", getUserByName);

export default router;
