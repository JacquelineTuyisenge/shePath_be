import express from 'express';
import { createTopic, getAllTopics, getTopicById, updateTopic, deleteTopic } from '../controllers/topic.controller';
import { authenticateUser } from '../middleware/authMiddleware';
import upload from "../middleware/multer";


const router = express.Router();

router.post("/", authenticateUser, upload.single("imageUrl"), createTopic);
router.get("/", getAllTopics);
router.get("/:id", getTopicById);
router.patch("/:id", authenticateUser, upload.single("imageUrl"), updateTopic);
router.delete("/:id", authenticateUser, deleteTopic);

export default router;