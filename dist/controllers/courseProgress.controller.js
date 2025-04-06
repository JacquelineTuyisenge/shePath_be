"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseProgress = exports.getCourseProgress = void 0;
const courseProgress_1 = __importDefault(require("../models/courseProgress"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Get course progress
const getCourseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const token = req.cookies.token;
    // const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const progress = yield courseProgress_1.default.findOne({
            where: { userId, courseId },
        });
        res.json(progress || { progress: 0, completed: false });
    }
    catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ error: "Failed to fetch progress" });
    }
});
exports.getCourseProgress = getCourseProgress;
// Update course progress
const updateCourseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { progress, completed } = req.body;
    // const token = req.header("Authorization")?.split(" ")[1];
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        // Find existing progress record
        let courseProgress = yield courseProgress_1.default.findOne({
            where: { userId, courseId },
        });
        if (courseProgress) {
            // Update existing record
            courseProgress = yield courseProgress.update({
                progress,
                completed,
                updatedAt: new Date(),
            });
        }
        else {
            // Create new record if it doesn’t exist
            courseProgress = yield courseProgress_1.default.create({
                userId,
                courseId,
                progress,
                completed,
                updatedAt: new Date(),
            });
        }
        res.json(courseProgress);
    }
    catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ error: "Failed to update progress" });
    }
});
exports.updateCourseProgress = updateCourseProgress;
