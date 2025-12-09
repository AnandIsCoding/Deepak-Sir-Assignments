import express from 'express';
import {authMiddleware} from '../middlewares/auth.middleware.js'
import { signupController, loginController, logoutController, getProfileController } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post('/signup', signupController);
userRouter.post('/login', loginController);
userRouter.delete('/logout', logoutController);
userRouter.get('/profile', authMiddleware, getProfileController);


export default userRouter;