import express from "express";
import { validateCourse } from "../validations/course.validation";
import { isAdmin } from "../middleware/authMiddleware";
import { createCourseCategory, getCourseCategories, getCourseCategory, updateCourseCategory, deleteCourseCategory, changeCourseCategory } from "../controllers/courceCategory.controllers";
const router = express.Router();

router.get("/", getCourseCategories); // Public
router.get("/:id", getCourseCategory); // Public

router.post("/", isAdmin, validateCourse, createCourseCategory); // Admin & Mentor
router.patch("/:id", isAdmin, validateCourse, updateCourseCategory); // Admin & Mentor
router.patch("/courseId", isAdmin, validateCourse, changeCourseCategory);
router.delete("/:id", isAdmin, deleteCourseCategory); // Admin only

export default router;
