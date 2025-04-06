import { Request, Response } from "express";
import Course from '../models/course'; 
import Topic from "../models/topic";
import Comment from "../models/comment";

export const handleUssdRequest = async (req: Request, res: Response) => {
  const { text } = req.body;
  let response = '';

  if (text === '') {
    response = `CON Welcome to ShePath! 🌟 What would you like to explore?
    1. What is ShePath?
    2. How do we help girls?
    3. View available courses
    4. View community topics`;
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
  } else if (text === '4') {
    const topics = await Topic.findAll();
    if (topics.length > 0) {
      response = `CON Community Topics:\n`;
      topics.forEach((topic, index) => {
        response += `${index + 1}. ${topic.content.substring(0, 60)}...\n`;
      });
      response += `${topics.length + 1}. Back to main menu`;
    } else {
      response = `END No topics available at the moment. Please check back later!`;
    }
  } else if (text.startsWith('4*')) {
    const topicIndex = parseInt(text.split('*')[1]) - 1; 
    const topics = await Topic.findAll({
      include: [{ model: Comment, as: 'comments' }], // Fetch comments with topic
    });
    if (topics[topicIndex]) {
      const topic = topics[topicIndex];
      const comments = topic.comments || []; // Now recognized by TypeScript
      const likes = topic.likes || []; // Now recognized by TypeScript
      const likesCount = likes.length;
      response = `END Topic Details:\n\nContent: ${topic.content}\n\n${likesCount}Likes ${comments.length} Comments:\n`;
      if (comments.length > 0) {
        comments.forEach((comment, index) => {
          response += `${index + 1}. ${comment.content}\n`;
        });
      } else {
        response += `No comments yet.\n`;
      }
    } else {
      response = `END Invalid selection. Please try again.`;
    }
  } else {
    response = `END Invalid selection. Please try again.`;
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
};