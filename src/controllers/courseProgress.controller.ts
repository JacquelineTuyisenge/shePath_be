// src/controllers/courseProgressController.ts
import { Request, Response } from "express";
import CourseProgress from "../models/courseProgress";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string }; // Assuming auth middleware adds user to req
}

// Get course progress
export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  const { courseId } = req.params;
  const token = req.cookies.token;

  // const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };
  const userId = decoded.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const progress = await CourseProgress.findOne({
      where: { userId, courseId },
    });
    res.json(progress || { progress: 0, completed: false });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

// Update course progress
export const updateCourseProgress = async (req: AuthRequest, res: Response) => {
  const { courseId } = req.params;
  const { progress, completed } = req.body;

  // const token = req.header("Authorization")?.split(" ")[1];
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };
  const userId = decoded.id;

  const errors = validationResult(req);
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
    let courseProgress = await CourseProgress.findOne({
      where: { userId, courseId },
    });

    if (courseProgress) {
      // Update existing record
      courseProgress = await courseProgress.update({
        progress,
        completed,
        updatedAt: new Date(),
      });
    } else {
      // Create new record if it doesn’t exist
      courseProgress = await CourseProgress.create({
        userId,
        courseId,
        progress,
        completed,
        updatedAt: new Date(),
      });
    }

    res.json(courseProgress);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
};