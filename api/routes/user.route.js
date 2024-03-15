import express from 'express';
import {verifyToken} from '../verifyUser/verifyUser.js'
import { fetchUsers,updateUser,deleteUser} from '../controllers/user.controller.js';
 const router= express.Router();
 
 router.get('/fetchUsers',fetchUsers)
 router.post('/updateUser/:_id',updateUser)
 router.post('/delete/:_id',deleteUser)
export default router;