import express from "express";
import {
  loginGoogle,
  loginGoogleCallback,
  loginFacebook,
  loginFacebookCallback,
} from "../controllers/auth.js";

const router = express.Router();

//PATH: /auth

router.get("/google", loginGoogle);

router.get("/google/callback", loginGoogleCallback);

router.get("/facebook", loginFacebook);

router.get("/facebook/callback", loginFacebookCallback);

// Router sau khi phát triển login normal
// router.get("/refreshToken", refreshToken);

export default router;
