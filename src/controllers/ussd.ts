import { Request, Response } from "express";
import Course from '../models/course'; 

export const handleUssdRequest = async (req: Request, res: Response) => {
    const { text } = req.body;
    let response = '';

    if (text === '') {
        response = `CON Welcome to ShePath! 🌟 What would you like to explore?
        1. What is ShePath?
        2. How do we help girls?
        3. View available courses`;
    } else if (text === '1') {
        response = `END ShePath is dedicated to empowering rural girls by providing access to education, mentorship, and resources. We believe every girl deserves a chance to learn and grow!`;
    } else if (text === '2') {
        response = `END We help girls by raising awareness about the importance of education, connecting them with mentors, and providing access to learning materials. Together, we can break barriers!`;
    } else if (text === '3') {

        const courses = await Course.findAll();
        if (courses.length > 0) {
            response = `CON Available Courses:\n`;
            courses.forEach((course, index) => {
                response += `${index + 1}. ${course.title}\n`;
            });
            response += `${courses.length + 1}. Back to main menu`;
        } else {
            response = `END No courses available at the moment. Please check back later!`;
        }
    } else if (text.startsWith('3*')) {
        const courseIndex = parseInt(text.split('*')[1]) - 1; 
        const courses = await Course.findAll();
        if (courses[courseIndex]) {
            const course = courses[courseIndex];
            response = `END Course Details:\nTitle: ${course.title}\nDescription: ${course.description}\nContent: ${course.content}`;
        } else {
            response = `END Invalid selection. Please try again.`;
        }
    } else {
        response = `END Invalid selection. Please try again.`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
};