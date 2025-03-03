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
exports.deleteCourseCategory = exports.changeCourseCategory = exports.updateCourseCategory = exports.getCourseCategory = exports.getCourseCategories = exports.createCourseCategory = void 0;
const courseCategory_1 = require("../models/courseCategory");
const course_1 = __importDefault(require("../models/course"));
// Create a new course category
const createCourseCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Check if category already exists
        const existingCategory = yield courseCategory_1.CourseCategory.findOne({ where: { name } });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }
        const newCategory = yield courseCategory_1.CourseCategory.create({ name, description });
        res.status(201).json({
            success: true,
            message: "Course category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createCourseCategory = createCourseCategory;
// Get all course categories
const getCourseCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield courseCategory_1.CourseCategory.findAll();
        res.status(200).json({ status: 200, message: "course categories retrieved successfully", data: categories });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCourseCategories = getCourseCategories;
// Get a single course category by ID
const getCourseCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield courseCategory_1.CourseCategory.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCourseCategory = getCourseCategory;
// Update a course category
const updateCourseCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const category = yield courseCategory_1.CourseCategory.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        category.name = name || category.name;
        category.description = description || category.description;
        yield category.save();
        res.status(200).json({
            success: true,
            message: "Course category updated successfully",
            data: category,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateCourseCategory = updateCourseCategory;
//change course category
const changeCourseCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseCat } = req.body;
        const courseId = req.params.courseId;
        const existingCategory = yield courseCategory_1.CourseCategory.findOne({ where: { name: courseCat } });
        if (!existingCategory) {
            res.status(404).json({ message: "Category does not exist!" });
            return;
        }
        const course = yield course_1.default.findByPk(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        yield course_1.default.update({ categoryId: existingCategory.id }, { where: { id: courseId } });
        const updatedCourse = yield course_1.default.findByPk(courseId, {
            include: {
                model: courseCategory_1.CourseCategory,
                attributes: [
                    'name', 'description'
                ]
            },
        });
        res.status(201).json({ message: "course category changed successfully", data: updatedCourse });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "SERVER ERROR", error });
    }
});
exports.changeCourseCategory = changeCourseCategory;
// Delete a course category
const deleteCourseCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield courseCategory_1.CourseCategory.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        yield category.destroy();
        res.status(200).json({
            success: true,
            message: "Course category deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteCourseCategory = deleteCourseCategory;
