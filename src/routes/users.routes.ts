import { UserController } from '@/controllers/user.controllers';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();
/* ----------------POST----------------- */
userRouter.post('/register', userController.registerUser);

export default userRouter;
