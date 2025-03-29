"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_controllers_1 = require("../controllers/likes.controllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Toggle like/unlike for topic or comment
router.post("/", authMiddleware_1.authenticateUser, likes_controllers_1.toggleLike);
// Get like count for a topic or comment
router.get("/:topicId", likes_controllers_1.getLikeCount); // Get likes count for a topic
router.get("/:commentId", likes_controllers_1.getLikeCount); // Get likes count for a comment
exports.default = router;
