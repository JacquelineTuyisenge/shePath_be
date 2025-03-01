import express from "express";
import { validateCourse } from "../validations/course.validation";
import { checkRole } from "../middleware/authMiddleware";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/course.controller";

const router = express.Router();

router.get("/", getCourses); // Public
router.get("/:id", getCourseById); // Public

router.post("/:categoryId", checkRole(["admin", "mentor"]), validateCourse, createCourse); // Admin & Mentor
router.patch("/:id/:categoryId", checkRole(["admin", "mentor"]), validateCourse, updateCourse); // Admin & Mentor
router.delete("/:id", checkRole(["admin"]), deleteCourse); // Admin only

export default router;
