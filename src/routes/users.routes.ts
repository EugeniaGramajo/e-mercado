import { authMiddleware } from '@/auth/authMiddleware';
import { UserController } from '@/controllers/user.controllers';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login',userController.loginUser);
userRouter.get('/:id', authMiddleware ,userController.getUserByID);

export default userRouter;
