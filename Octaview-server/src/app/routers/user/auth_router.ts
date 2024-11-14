// src/app/routers/user/authRouter.ts
import { Router } from 'express';
import { signup, login } from '../../controllers/user/user_Auth_controllers';

const authRouter = Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;
 