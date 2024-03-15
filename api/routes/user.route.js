import express from 'express';
import {verifyToken} from '../verifyUser/verifyUser.js'
import { fetchUsers} from '../controllers/user.controller.js';
 const router= express.Router();
 
 router.get('/fetchUsers',fetchUsers)
 
export default router;