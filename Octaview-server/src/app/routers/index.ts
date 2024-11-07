import { Router } from 'express';
import userAuthRouter from './user/auth_router';

const router = Router();

router.use('/user', userAuthRouter);

export default router;
