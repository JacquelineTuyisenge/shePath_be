import express from 'express';
import { connectDB } from './server';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import roleRoutes from './routes/roleRoutes';
import courseRoutes from './routes/courseRoutes';
import CourseCategoryRoutes from './routes/courseCategoryRoutes';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 10000;
const app = express();

app.use(express.json());

//cors
app.use(cors({
    origin: 'https://she-path-front.vercel.app',
    credentials: true
}));

//use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courseCategories', CourseCategoryRoutes)

// default route
app.get('/', (req, res) => {
    res.send('Welcome to shePath Platform!')
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