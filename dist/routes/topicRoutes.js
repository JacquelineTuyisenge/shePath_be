"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topic_controller_1 = require("../controllers/topic.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticateUser, multer_1.default.single("imageUrl"), topic_controller_1.createTopic);
router.get("/", topic_controller_1.getAllTopics);
router.get("/:id", topic_controller_1.getTopicById);
router.patch("/:id", authMiddleware_1.authenticateUser, multer_1.default.single("imageUrl"), topic_controller_1.updateTopic);
router.delete("/:id", authMiddleware_1.authenticateUser, topic_controller_1.deleteTopic);
exports.default = router;
