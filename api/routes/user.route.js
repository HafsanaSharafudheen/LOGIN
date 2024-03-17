import express from 'express';
import { upload } from '../multer/multer.js';
import {verifyToken} from '../verifyUser/verifyUser.js'
import { fetchUsers,updateUser,deleteUser,profileUpload} from '../controllers/user.controller.js';
 const router= express.Router();
 
 router.get('/fetchUsers',verifyToken,fetchUsers)
 router.post('/updateUser/:_id',verifyToken,updateUser)
 router.post('/delete/:_id',verifyToken,deleteUser)
 router.post('/profile/:_id',verifyToken,upload.single('profilePicture'),profileUpload)
export default router;