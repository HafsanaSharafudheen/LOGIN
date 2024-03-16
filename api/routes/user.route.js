import express from 'express';
import { upload } from '../multer/multer.js';
import {verifyToken} from '../verifyUser/verifyUser.js'
import { fetchUsers,updateUser,deleteUser,profileUpload} from '../controllers/user.controller.js';
 const router= express.Router();
 
 router.get('/fetchUsers',fetchUsers)
 router.post('/updateUser/:_id',updateUser)
 router.post('/delete/:_id',deleteUser)
 router.post('/profile/:_id',upload.single('profilePicture'),profileUpload)
export default router;