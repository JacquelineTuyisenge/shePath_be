// src/routes/courseProgressRoutes.ts
import express from "express";
import { body } from "express-validator";
import { authenticateUser } from "../middleware/authMiddleware";
import { getCourseProgress, updateCourseProgress } from "../controllers/courseProgress.controller";

const router = express.Router();

// Middleware to authenticate requests (adjust based on your auth setup)
// router.use(authenticateUser);

// Get progress for a course
router.get("/:courseId", getCourseProgress);

// Update progress for a course
router.post(
  "/:courseId",
  [
    body("progress").isFloat({ min: 0, max: 100 }).withMessage("Progress must be between 0 and 100"),
    body("completed").isBoolean().withMessage("Completed must be a boolean"),
  ],
  updateCourseProgress
);

export default router;