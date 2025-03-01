import express from "express";
import { validateCourse } from "../validations/course.validation";
import { checkRole } from "../middleware/authMiddleware";
import { createCourseCategory, getCourseCategories, getCourseCategory, updateCourseCategory, deleteCourseCategory } from "../controllers/courceCategory.controllers";
const router = express.Router();

router.get("/", getCourseCategories); // Public
router.get("/:id", getCourseCategory); // Public

router.post("/", checkRole(["admin", "mentor"]), validateCourse, createCourseCategory); // Admin & Mentor
router.patch("/:id", checkRole(["admin", "mentor"]), validateCourse, updateCourseCategory); // Admin & Mentor
router.delete("/:id", checkRole(["admin"]), deleteCourseCategory); // Admin only

export default router;
