import express from "express";
import { validateCourse } from "../validations/course.validation";
// import { checkRole } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/authMiddleware";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/course.controller";
import { handleUssdRequest } from "../controllers/ussd";

const router = express.Router();

router.get("/", getCourses); // Public
router.get("/:id", getCourseById); // Public
router.post("/ussd", handleUssdRequest); //ussd 
router.post("/:categoryId", isAdmin, validateCourse, createCourse); 
router.patch("/:id", isAdmin, validateCourse, updateCourse); 
router.delete("/:id", isAdmin, deleteCourse); 

export default router;
