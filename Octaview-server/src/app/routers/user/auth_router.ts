import { Router } from 'express';


const userAuthRouter = Router();

userAuthRouter.post('/signup');
userAuthRouter.post('/login');


export default userAuthRouter;
