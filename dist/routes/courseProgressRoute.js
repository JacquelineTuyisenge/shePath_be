"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/courseProgressRoutes.ts
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const courseProgress_controller_1 = require("../controllers/courseProgress.controller");
const router = express_1.default.Router();
// Get progress for a course
router.get("/:courseId", authMiddleware_1.authenticateUser, courseProgress_controller_1.getCourseProgress);
// Update progress for a course
router.post("/:courseId", [
    (0, express_validator_1.body)("progress").isFloat({ min: 0, max: 100 }).withMessage("Progress must be between 0 and 100"),
    (0, express_validator_1.body)("completed").isBoolean().withMessage("Completed must be a boolean"),
], authMiddleware_1.authenticateUser, courseProgress_controller_1.updateCourseProgress);
exports.default = router;
