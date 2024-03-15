import User from '../models/user.model.js'; 

export const fetchUsers=async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({message:"fetching all users successfully", users:users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
   




