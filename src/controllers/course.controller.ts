import { Request, Response} from "express";
import { sendResponse } from "../utils/response";
import {Course} from "../models/course";
import { sendSMS } from '../smsService'
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

      const category = await CourseCategory.findByPk(categoryId);

      //sms

      const phoneNumber = process.env.PHONE as string; // my verified number 
      const message = `${newCourse.title}`;
      await sendSMS(phoneNumber, message);

      console.log("hyyyyyyyyyyyyy");

  
      res.status(201).json({ 
        success: true, 
        message: "Course created successfully", 
        data: {
          ...newCourse.toJSON(),
          categoryName: category ? category.name : "unKnown Category",
        },
      });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };
  

export const getCourses = async (req: Request, res: Response) => {
    try{

        const courses = await Course.findAll({
          include: [
            {
              model: CourseCategory,
              as: "category",
              attributes: ["name"]
            },
          ],
        });

        if (!courses){
            res.status(404).json({message: "not found"});
        }

        const updatedCourses = courses.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          content: course.content,
          categoryId: (course as any).category.name,
          createdAt: course.createdAt
        }))

        res.status(200).json({message: "all courses", data: updatedCourses});
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

export const getCoursesByCategory = async (req: Request, res: Response) => {
  try {
      const { categoryId } = req.params;

      const courses = await Course.findAll({
          where: { categoryId },
          include: [
              {
                  model: CourseCategory,
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
          categoryName: (course as any).category.name,
          createdAt: course.createdAt,
      }));

      res.status(200).json({ success: true, message: "Courses by category retrieved successfully", data: updatedCourses });
      return;
  } catch (error) {
      console.error("Error fetching courses by category:", error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
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