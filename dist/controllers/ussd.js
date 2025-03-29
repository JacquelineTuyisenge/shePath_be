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
exports.handleUssdRequest = void 0;
const course_1 = __importDefault(require("../models/course"));
const topic_1 = __importDefault(require("../models/topic"));
const handleUssdRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    let response = '';
    if (text === '') {
        response = `CON Welcome to ShePath! 🌟 What would you like to explore?
        1. What is ShePath?
        2. How do we help girls?
        3. View available courses
        4. View community topics`;
    }
    else if (text === '1') {
        response = `END ShePath is dedicated to empowering rural girls by providing access to education, mentorship, and resources. We believe every girl deserves a chance to learn and grow!`;
    }
    else if (text === '2') {
        response = `END We help girls by raising awareness about the importance of education, connecting them with mentors, and providing access to learning materials. Together, we can break barriers!`;
    }
    else if (text === '3') {
        const courses = yield course_1.default.findAll();
        if (courses.length > 0) {
            response = `CON Available Courses:\n`;
            courses.forEach((course, index) => {
                response += `${index + 1}. ${course.title}\n`;
            });
            response += `${courses.length + 1}. Back to main menu`;
        }
        else {
            response = `END No courses available at the moment. Please check back later!`;
        }
    }
    else if (text.startsWith('3*')) {
        const courseIndex = parseInt(text.split('*')[1]) - 1;
        const courses = yield course_1.default.findAll();
        if (courses[courseIndex]) {
            const course = courses[courseIndex];
            response = `END Course Details:\nTitle: ${course.title}\nDescription: ${course.description}\nContent: ${course.content}`;
        }
        else {
            response = `END Invalid selection. Please try again.`;
        }
    }
    else if (text === '4') {
        const topics = yield topic_1.default.findAll();
        if (topics.length > 0) {
            response = `CON Community Topics:\n`;
            topics.forEach((topic, index) => {
                response += `${index + 1}. ${topic.content.substring(0, 30)}...\n`;
            });
            response += `${topics.length + 1}. Back to main menu`;
        }
        else {
            response = `END No topics available at the moment. Please check back later!`;
        }
    }
    else if (text.startsWith('4*')) {
        const topicIndex = parseInt(text.split('*')[1]) - 1;
        const topics = yield topic_1.default.findAll();
        if (topics[topicIndex]) {
            const topic = topics[topicIndex];
            response = `END Topic Details:\nContent: ${topic.content}`;
        }
        else {
            response = `END Invalid selection. Please try again.`;
        }
    }
    else {
        response = `END Invalid selection. Please try again.`;
    }
    res.set('Content-Type', 'text/plain');
    res.send(response);
});
exports.handleUssdRequest = handleUssdRequest;
