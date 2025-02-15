import express from "express";
import { authenticateToken } from "../middleware/middleware.js";

// Import các route con
import authRoutes from "./auth.js";
import postRoutes from "./posts.js";
import reactionRoutes from "./reaction.js";
import commentRoutes from "./comments.js";
import userRoutes from "./users.js";
import chatRoutes from "./chats.js";
import messageRoutes from "./messages.js";

const router = express.Router();

// Sử dụng các route con
router.use("/auth", authRoutes); // Route cho /auth
router.use("/posts", authenticateToken, postRoutes); // Route cho /posts
router.use("/reaction", authenticateToken, reactionRoutes); // Route cho /posts
router.use("/comments", authenticateToken, commentRoutes); // Route cho /comment
router.use("/users", authenticateToken, userRoutes); // Route cho /user
router.use("/chats", authenticateToken, chatRoutes); // Route cho /chat
router.use("/messages", authenticateToken, messageRoutes); // Route cho /message

// Export router
export default router;
