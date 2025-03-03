import { body, param } from "express-validator";

export const validateCourse = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  param("categoryId").notEmpty().withMessage("Category ID is required"),
];
