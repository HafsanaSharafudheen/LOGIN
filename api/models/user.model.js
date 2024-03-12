// user.model.js
import mongoose from '../config/db.js';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    createdAt: {
        type: Date, // Specify Date type for createdAt field
        default: Date.now
    },
    updatedAt: {
        type: Date // Specify Date type for updatedAt field
    },
    profilePicture: {
        type: String
    },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
