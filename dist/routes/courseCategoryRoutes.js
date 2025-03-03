"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_validation_1 = require("../validations/course.validation");
const authMiddleware_1 = require("../middleware/authMiddleware");
const courceCategory_controllers_1 = require("../controllers/courceCategory.controllers");
const router = express_1.default.Router();
router.get("/", courceCategory_controllers_1.getCourseCategories); // Public
router.get("/:id", courceCategory_controllers_1.getCourseCategory); // Public
router.post("/", (0, authMiddleware_1.checkRole)(["Admin", "Guide-Mentor"]), course_validation_1.validateCourse, courceCategory_controllers_1.createCourseCategory); // Admin & Mentor
router.patch("/:id", (0, authMiddleware_1.checkRole)(["Admin", "Guide-Mentor"]), course_validation_1.validateCourse, courceCategory_controllers_1.updateCourseCategory); // Admin & Mentor
router.patch("/courseId", (0, authMiddleware_1.checkRole)(["Admin", "Guide-Mentor"]), course_validation_1.validateCourse, courceCategory_controllers_1.changeCourseCategory);
router.delete("/:id", (0, authMiddleware_1.checkRole)(["admin"]), courceCategory_controllers_1.deleteCourseCategory); // Admin only
exports.default = router;
