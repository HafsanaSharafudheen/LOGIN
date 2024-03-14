import User from '../models/user.model.js'; 
import {upload} from '../multer/multer.js'

export const fetchUsers=async (req,res)=>{
    try {   
        const users = await User.find();
        console.log(users,'alllllllllllllllllllll')
        res.status(200).json({message:"fetching all users successfully", users:users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
   

// Update the user's profile picture
export const updateProfile = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.error('Error uploading profile picture:', err);
                return res.status(500).json({ message: 'Error uploading profile picture' });
            }

            // Extract the user ID from the request parameters
            const { userId } = req.params;

            // Find the user by ID
            let user = await User.findById(userId);

            // If user not found, return an error response
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the user's profile picture
            user.profilePicture = req.file.filename;

            // Save the updated user
            user = await user.save();

            // Respond with the updated user object
            res.status(200).json({ message: 'Profile picture updated successfully', user });
        });
    } catch (error) {
        // Handle any errors
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete user account by ID
export const deleteAccount = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json("You can only delete your own account");
    }
    try {
        const userId = req.params.userId;

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);

        // If user not found, return an error response
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update user information by ID
export const updateUser = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json("You can only update your own account");
    }

    try {
        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture
            }
        }, { new: true }); // Set { new: true } to return the updated user

        // If user not found, return an error response
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user object
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        // Handle any errors
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
