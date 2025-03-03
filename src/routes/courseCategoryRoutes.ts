import express from "express";
import { validateCourse } from "../validations/course.validation";
import { checkRole } from "../middleware/authMiddleware";
import { createCourseCategory, getCourseCategories, getCourseCategory, updateCourseCategory, deleteCourseCategory, changeCourseCategory } from "../controllers/courceCategory.controllers";
const router = express.Router();

router.get("/", getCourseCategories); // Public
router.get("/:id", getCourseCategory); // Public

router.post("/", checkRole(["Admin", "Guide-Mentor"]), validateCourse, createCourseCategory); // Admin & Mentor
router.patch("/:id", checkRole(["Admin", "Guide-Mentor"]), validateCourse, updateCourseCategory); // Admin & Mentor
router.patch("/courseId", checkRole(["Admin", "Guide-Mentor"]), validateCourse, changeCourseCategory);
router.delete("/:id", checkRole(["admin"]), deleteCourseCategory); // Admin only

export default router;
