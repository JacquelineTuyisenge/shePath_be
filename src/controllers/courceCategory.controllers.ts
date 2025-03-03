import { Request, Response } from "express";
import { CourseCategory } from "../models/courseCategory";
import Course from "../models/course";

// Create a new course category
export const createCourseCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await CourseCategory.findOne({ where: { name } });
    if (existingCategory) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const newCategory = await CourseCategory.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Course category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all course categories
export const getCourseCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CourseCategory.findAll();
    res.status(200).json({ status: 200, message: "course categories retrieved successfully", data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single course category by ID
export const getCourseCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await CourseCategory.findByPk(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a course category
export const updateCourseCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await CourseCategory.findByPk(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.status(200).json({
      success: true,
      message: "Course category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//change course category

export const changeCourseCategory = async(req:Request, res:Response) => {
  try{
    const {courseCat} = req.body;
    const courseId = req.params.courseId;

    const existingCategory = await CourseCategory.findOne({ where: {name: courseCat}});

    if(!existingCategory) {
      res.status(404).json({message: "Category does not exist!"});
      return;
    }

    const course = await Course.findByPk(courseId);
    if(!course){
      res.status(404).json({message: "Course not found"});
      return;
    }

    await Course.update({categoryId: existingCategory.id}, {where: {id: courseId}});

    const updatedCourse = await Course.findByPk(courseId, {
      include: {
        model: CourseCategory,
        attributes: [
          'name', 'description'
        ]
      },
    });

    res.status(201).json({message: "course category changed successfully", data: updatedCourse});
    return;

  }catch(error: any) {
    res.status(500).json({message: "SERVER ERROR", error})
  }
}

// Delete a course category
export const deleteCourseCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await CourseCategory.findByPk(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await category.destroy();
    res.status(200).json({
      success: true,
      message: "Course category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
