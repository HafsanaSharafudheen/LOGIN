import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://hafsanasharafudheen:hafsanasharafudheen@mern.brrfyaa.mongodb.net";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
