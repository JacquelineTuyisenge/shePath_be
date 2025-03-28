import express from "express";
import { validateCourse } from "../validations/course.validation";
import { isAdmin } from "../middleware/authMiddleware";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/course.controller";
import { handleUssdRequest } from "../controllers/ussd";
import upload from "../middleware/multer";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/ussd", handleUssdRequest);
router.post("/:categoryId", 
    isAdmin, 
    upload.single('image'), 
    validateCourse, 
    createCourse
);
router.patch("/:id", 
    isAdmin, 
    upload.single('image'), 
    validateCourse, 
    updateCourse
);
router.delete("/:id", isAdmin, deleteCourse);

export default router;