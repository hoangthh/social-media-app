import express from "express";

// Import các route con
import authRoutes from "./auth.js";
import postRoutes from "./posts.js";
import userRoutes from "./user.js";

const router = express.Router();

// Sử dụng các route con
router.use("/auth", authRoutes); // Route cho /auth
router.use("/posts", postRoutes); // Route cho /posts
router.use("/user", userRoutes); // Route cho /user

// Export router
export default router;
