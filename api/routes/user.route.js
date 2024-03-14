import express from 'express';
import {verifyToken} from '../verifyUser/verifyUser.js'
import {updateProfile,deleteAccount,updateUser,fetchUsers} from '../controllers/user.controller.js';
 const router= express.Router();
 
 router.get('/fetchUsers',fetchUsers)
 router.post('/delete-account/:id',verifyToken,deleteAccount)
router.post('/update-Profile',updateProfile)
 router.post('/update/:id',verifyToken,updateUser)
export default router;