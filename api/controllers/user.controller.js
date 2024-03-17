import User from '../models/user.model.js'; 
import ObjectId from 'mongoose'
export const fetchUsers=async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({message:"fetching all users successfully", users:users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
export const updateUser = async (req, res) => {
    try {
        const { _id } = req.params; // Extract user ID from URL parameters
        const updatedUser = req.body; // Get updated user data from request body

        // Update the user in the database
        const user = await User.findByIdAndUpdate(_id, updatedUser, { new: true });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const deleteUser = async (req, res) => {
    const userId = req.params._id; // Assuming the user ID is passed as a parameter in the request

    try {
        // Delete user from the database
        await User.findByIdAndDelete(userId);

        // Optionally, you can send a response indicating success
        res.status(200).json({ message: 'User deleted successfully' });

        
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const profileUpload = async (req, res) => {
    console.log("profileUpload");
    console.log(req.file);
    console.log(req.params._id, '.........id');

    try {
        const userId = req.params._id;
<<<<<<< HEAD
=======

>>>>>>> 527880ad4e985b4907fcc6e405e6dc2d7a577e10
        // Update the user's profile image
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: req.file.filename }, // Set the profileImage field to the new filename
            { new: true } // Return the updated user document
        );
        console.log(updatedUser,"updatedUser")

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile image updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




