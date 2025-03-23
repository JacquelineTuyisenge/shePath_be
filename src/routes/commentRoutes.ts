import express from "express";
import {
    createComment,
} from "../controllers/comment.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, createComment);
export default router;
