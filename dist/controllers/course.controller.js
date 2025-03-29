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
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCoursesByCategory = exports.getCourses = exports.createCourse = void 0;
const course_1 = require("../models/course");
const courseCategory_1 = __importDefault(require("../models/courseCategory"));
const express_validator_1 = require("express-validator");
const cloudinary_1 = require("cloudinary");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        const { title, description, content } = req.body;
        const { categoryId } = req.params; // Get categoryId from params
        let imageUrl;
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const newCourse = yield course_1.Course.create({
            title,
            description,
            content,
            categoryId,
            image: imageUrl
        });
        const category = yield courseCategory_1.default.findByPk(categoryId);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: Object.assign(Object.assign({}, newCourse.toJSON()), { categoryName: category ? category.name : "unKnown Category" }),
        });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
});
exports.createCourse = createCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.Course.findAll({
            include: [
                {
                    model: courseCategory_1.default,
                    as: "category",
                    attributes: ["name"]
                },
            ],
        });
        if (!courses) {
            res.status(404).json({ message: "not found" });
        }
        const updatedCourses = courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            content: course.content,
            image: course.image,
            categoryId: course.category.name,
            createdAt: course.createdAt
        }));
        res.status(200).json({ message: "all courses", data: updatedCourses });
        return;
        // console.log("courses", courses);
        // sendResponse(res, 201, "SUCCESS", "Course retrieved successfully!");
    }
    catch (error) {
        console.log("errorrrrrrrrrr", error);
        res.status(500).json({ message: "some thing went wrong", error });
        return;
        // sendResponse(res, 500, "SERVER ERROR", "Something went wrong")
    }
});
exports.getCourses = getCourses;
const getCoursesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const courses = yield course_1.Course.findAll({
            where: { categoryId },
            include: [
                {
                    model: courseCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });
        if (!courses.length) {
            return res.status(404).json({ success: false, message: "No courses found for this category" });
        }
        const updatedCourses = courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            content: course.content,
            categoryName: course.category.name,
            createdAt: course.createdAt,
        }));
        res.status(200).json({ success: true, message: "Courses by category retrieved successfully", data: updatedCourses });
        return;
    }
    catch (error) {
        console.error("Error fetching courses by category:", error);
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
});
exports.getCoursesByCategory = getCoursesByCategory;
// Get a single course by ID (Accessible to everyone)
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_1.Course.findByPk(id);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }
        res.status(200).json({ success: true, data: course });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
});
exports.getCourseById = getCourseById;
// Update a course (Admin & Mentor only)
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get categoryId from params
        const { title, description, content } = req.body;
        const course = yield course_1.Course.findByPk(id);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }
        let imageUrl = course.image;
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        yield course.update({ title, description, content, image: imageUrl });
        res.status(200).json({ success: true, message: "Course updated successfully", data: course });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: `${error}` });
        return;
    }
});
exports.updateCourse = updateCourse;
// Delete a course (Admin only - Hard delete)
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_1.Course.findByPk(id);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }
        yield course.destroy(); // Hard delete
        res.status(200).json({ success: true, message: "Course deleted successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
    }
});
exports.deleteCourse = deleteCourse;
