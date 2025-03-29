// src/routes/courseProgressRoutes.ts
import express from "express";
import { body } from "express-validator";
import { authenticateUser } from "../middleware/authMiddleware";
import { getCourseProgress, updateCourseProgress } from "../controllers/courseProgress.controller";

const router = express.Router();

// Get progress for a course
router.get("/:courseId", authenticateUser, getCourseProgress);

// Update progress for a course
router.post(
  "/:courseId",
  [
    body("progress").isFloat({ min: 0, max: 100 }).withMessage("Progress must be between 0 and 100"),
    body("completed").isBoolean().withMessage("Completed must be a boolean"),
  ], authenticateUser,
  updateCourseProgress
);

export default router;