"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_validation_1 = require("../validations/course.validation");
// import { checkRole } from "../middleware/authMiddleware";
const authMiddleware_1 = require("../middleware/authMiddleware");
const course_controller_1 = require("../controllers/course.controller");
const router = express_1.default.Router();
router.get("/", course_controller_1.getCourses); // Public
router.get("/:id", course_controller_1.getCourseById); // Public
router.post("/:categoryId", authMiddleware_1.isAdmin, course_validation_1.validateCourse, course_controller_1.createCourse);
router.patch("/:id/:categoryId", authMiddleware_1.isAdmin, course_validation_1.validateCourse, course_controller_1.updateCourse);
router.delete("/:id", authMiddleware_1.isAdmin, course_controller_1.deleteCourse);
exports.default = router;
