import { Router } from 'express';
import { sayHello } from '../../controllers/user/user_Auth_controllers';

const userAuthRouter = Router();

userAuthRouter.post('/signup');
userAuthRouter.post('/login');
userAuthRouter.get("/test",sayHello)

export default userAuthRouter;
