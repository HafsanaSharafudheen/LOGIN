import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
console.log({ username, email, password })
    const newUser = new User({ "username":username, "email":email, "password": hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error,"----------------error-------------------")

        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Wrong credentials" });
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        //to hide the password,after checking remove the valid user password.
        const {password:hashedPassword,...rest} = validUser._doc;
        const expiryDate=new Date(Date.now()+3600000)
        res.cookie('access_token', token, { httpOnly: true ,expires :expiryDate}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

// Update the API endpoint to accept the user ID as a parameter
export const updateProfile = async (req, res) => {
    try {
        // Extract the profilePicture from the request body
        const { profilePicture } = req.body;
        
        // Extract the user ID from the request parameters
        const { userId } = req.params;

        // Find the user by ID
        let user = await User.findById(userId);

        // If user not found, return an error response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile picture
        user.profilePicture = profilePicture;

        // Save the updated user
        user = await user.save();

        // Respond with the updated user object
        res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
        // Handle any errors
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteAccount = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
      console.error('Error deleting user account:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };