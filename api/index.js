import express from 'express';
//import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors'; 
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
//connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

app.use(express.static('public'));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
//set up a middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    });
});
