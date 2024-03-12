import express from 'express';
const router = express.Router();

import { signin, signup,updateProfile,deleteAccount } from '../controllers/auth.controller.js';

router.post('/signup', signup);
router.post('/signin',signin);
router.post('/profile-picture',updateProfile)
router.post('/delete-account',deleteAccount)
export default router;
