"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_validation_1 = require("../validations/course.validation");
const authMiddleware_1 = require("../middleware/authMiddleware");
const course_controller_1 = require("../controllers/course.controller");
const ussd_1 = require("../controllers/ussd");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.get("/", course_controller_1.getCourses);
router.get("/:id", course_controller_1.getCourseById);
router.post("/ussd", ussd_1.handleUssdRequest);
router.post("/:categoryId", authMiddleware_1.isAdmin, multer_1.default.single('image'), course_validation_1.validateCourse, course_controller_1.createCourse);
router.patch("/:id", authMiddleware_1.isAdmin, multer_1.default.single('image'), course_validation_1.validateCourse, course_controller_1.updateCourse);
router.delete("/:id", authMiddleware_1.isAdmin, course_controller_1.deleteCourse);
exports.default = router;
