import express from 'express';
import { connectDB } from './server';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

//use auth routes
app.use('/api/auth', authRoutes);

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