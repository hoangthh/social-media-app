import express from "express";
import { loginGoogle, loginGoogleCallback } from "../controllers/auth.js";

const router = express.Router();

//PATH: /auth

router.get("/google", loginGoogle);

router.get("/google/callback", loginGoogleCallback);

export default router;
