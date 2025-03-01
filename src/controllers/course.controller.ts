import { Request, Response} from "express";
import { sendResponse } from "../utils/response";
import {Course} from "../models/course";
import CourseCategory from "../models/courseCategory";
import { validationResult } from "express-validator";

export const createCourse = async (req: Request, res: Response) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }
  
      const { title, description, content } = req.body;
      const { categoryId } = req.params; // Get categoryId from params
  
      const newCourse = await Course.create({
        title,
        description,
        content,
        categoryId,
      });
  
      res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };
  

export const getCourses = async (req: Request, res: Response) => {
    try{

        const courses = await Course.findAll();

        if (!courses){
            res.status(404).json({message: "not found"});
        }
        res.status(200).json({message: "all roles", courses});
        return;
        // console.log("courses", courses);

        // sendResponse(res, 201, "SUCCESS", "Course retrieved successfully!");

    } catch(error: any) {
        console.log("errorrrrrrrrrr", error);
        res.status(500).json({message: "some thing went wrong", error});
        return;
        // sendResponse(res, 500, "SERVER ERROR", "Something went wrong")
    }
};

// Get a single course by ID (Accessible to everyone)
export const getCourseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) {
        res.status(404).json({ success: false, message: "Course not found" });
        return; 
      }
      res.status(200).json({ success: true, data: course });
      return; 
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
      return; 
    }
  };

// Update a course (Admin & Mentor only)
export const updateCourse = async (req: Request, res: Response) => {
    try {
      const { id, categoryId } = req.params; // Get categoryId from params
      const { title, description } = req.body;
  
      const course = await Course.findByPk(id);
      if (!course) {
        res.status(404).json({ success: false, message: "Course not found" });
        return;
      }
  
      await course.update({ title, description, categoryId });
  
      res.status(200).json({ success: true, message: "Course updated successfully", data: course });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };

  // Delete a course (Admin only - Hard delete)
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
       res.status(404).json({ success: false, message: "Course not found" });
       return;
    }

    await course.destroy(); // Hard delete

     res.status(200).json({ success: true, message: "Course deleted successfully" });
     return;
  } catch (error) {
     res.status(500).json({ success: false, message: "Server error" });
     return;
  }
};