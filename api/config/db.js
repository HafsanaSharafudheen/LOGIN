// connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://hafsanasharafudheen:hafsanasharafudheen@mern.brrfyaa.mongodb.net/test";
        
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Check if mongoose connection is not already open, then connect
if (mongoose.connection.readyState !== 1) {
    connectDB();
}

// Export the mongoose instance
export default mongoose;
