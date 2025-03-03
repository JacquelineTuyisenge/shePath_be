import express from "express";
import { validateCourse } from "../validations/course.validation";
// import { checkRole } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/authMiddleware";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/course.controller";

const router = express.Router();

router.get("/", getCourses); // Public
router.get("/:id", getCourseById); // Public

router.post("/:categoryId", isAdmin, validateCourse, createCourse); 
router.patch("/:id/:categoryId", isAdmin, validateCourse, updateCourse); 
router.delete("/:id", isAdmin, deleteCourse); 

export default router;
