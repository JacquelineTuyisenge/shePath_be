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
exports.createCourse = void 0;
const smsService_1 = require("../smsService");
const course_1 = require("../models/course");
const courseCategory_1 = __importDefault(require("../models/courseCategory"));
const express_validator_1 = require("express-validator");
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
        const newCourse = yield course_1.Course.create({
            title,
            description,
            content,
            categoryId,
        });
        const category = yield courseCategory_1.default.findByPk(categoryId);
        // Send SMS notification to the user (replace with actual user phone number)
        const phoneNumber = '+1234567890'; // Replace with the actual phone number
        const message = `A new course titled "${newCourse.title}" has been created under the category "${category ? category.name : 'Unknown Category'}"`;
        yield (0, smsService_1.sendSMS)(phoneNumber, message);
        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: Object.assign(Object.assign({}, newCourse.toJSON()), { categoryName: category ? category.name : 'Unknown Category' }),
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.createCourse = createCourse;
