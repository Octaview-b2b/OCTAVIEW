import { Router } from 'express';
import userAuthRouter from './user/auth_router';

const router = Router();

// Mount specific routes
router.use('/user', userAuthRouter);

export default router;
