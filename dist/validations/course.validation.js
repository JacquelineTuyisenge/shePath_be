"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCourse = void 0;
const express_validator_1 = require("express-validator");
exports.validateCourse = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.param)("categoryId").notEmpty().withMessage("Category ID is required"),
];
