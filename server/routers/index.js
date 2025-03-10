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
import friendRoutes from "./friends.js";
import notificationRoutes from "./notifications.js";

const router = express.Router();

// Sử dụng các route con
router.use("/auth", authRoutes); // Route cho /auth
router.use("/posts", authenticateToken, postRoutes); // Route cho /posts
router.use("/reaction", authenticateToken, reactionRoutes); // Route cho /reaction
router.use("/comments", authenticateToken, commentRoutes); // Route cho /comments
router.use("/users", authenticateToken, userRoutes); // Route cho /users
router.use("/chats", authenticateToken, chatRoutes); // Route cho /chats
router.use("/messages", authenticateToken, messageRoutes); // Route cho /messages
router.use("/friends", authenticateToken, friendRoutes); // Route cho /friends
router.use("/notifications", authenticateToken, notificationRoutes); // Route cho /notifications

// Export router
export default router;
