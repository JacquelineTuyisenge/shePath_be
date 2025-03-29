import express from "express";
import { toggleLike, getLikeCount } from "../controllers/likes.controllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// Toggle like/unlike for topic or comment
router.post("/", authenticateUser, toggleLike);

// Get like count for a topic or comment
router.get("/:topicId", getLikeCount); // Get likes count for a topic
router.get("/:commentId", getLikeCount); // Get likes count for a comment

export default router;
