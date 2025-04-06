import express from 'express';
const bodyParser = require('body-parser');
import cookieParser from 'cookie-parser';
import { connectDB } from './server';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import roleRoutes from './routes/roleRoutes';
import courseRoutes from './routes/courseRoutes';
import CourseCategoryRoutes from './routes/courseCategoryRoutes';
import ussdRoutes from './routes/ussdRoutes';
import topicRoutes from './routes/topicRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';
import messageRoutes from './routes/messageRoutes';
import chatRoutes from './routes/chatRoutes';
import progressRoutes from './routes/courseProgressRoute';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';



dotenv.config();

const PORT = process.env.PORT || 10000;
const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // for parsing cookies

app.use(cors({
    origin: ['http://localhost:5173', 'https://she-path-front.vercel.app'],
    credentials: true
}));

//use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courseCategories', CourseCategoryRoutes);
app.use('/progress', progressRoutes);
app.use('/ussd', ussdRoutes);
app.use('/topics', topicRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/messages', messageRoutes);
app.use('/chats', chatRoutes);

// default route
app.get('/', (req, res) => {
    res.send('Welcome to shePath Platform!')
});

// Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET 
});

//start server
const startServer = async () => {
    await connectDB(); //db is to be connected before server start
    app.listen(PORT,()=>{
        console.log(`🚀 Server is running on port ${PORT}, access it on http://localhost:${PORT}`)
    });
};

startServer();

export default app;