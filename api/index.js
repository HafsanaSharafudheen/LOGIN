import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/user.route.js'

import dotenv from 'dotenv';
dotenv.config();
var c="mongodb+srv://hafsanasharafudheen:hafsanasharafudheen@mern.brrfyaa.mongodb.net"
mongoose.connect(c).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});




const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("server listening on port 3000");
})
app.use('/api/user',userRoutes);
app.use('api/auth',authRoutes);