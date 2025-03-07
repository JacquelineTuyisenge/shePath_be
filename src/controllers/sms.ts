import { Request, Response } from 'express';
import { sendSMS } from '../smsService'
import { Course } from '../models/course';
import CourseCategory from '../models/courseCategory';
import { validationResult } from 'express-validator';

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

    // Send SMS notification to the user (replace with actual user phone number)
    const phoneNumber = '+1234567890'; // Replace with the actual phone number
    const message = `A new course titled "${newCourse.title}" has been created under the category "${category ? category.name : 'Unknown Category'}"`;
    await sendSMS(phoneNumber, message);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        ...newCourse.toJSON(),
        categoryName: category ? category.name : 'Unknown Category',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
