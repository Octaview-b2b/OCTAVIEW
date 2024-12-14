import { Router } from 'express';
import userAuthRouter from './user/auth_router';
import JobRouter from './user/jobs_router';
import {candidateExtRouter,candidateRouter} from './user/candidate_router';

const router = Router();

router.use('/user', userAuthRouter);
router.use('/jobs',JobRouter)
router.use('/candidate',candidateRouter)
router.use('/jobs/ext/apply',candidateExtRouter)

export default router;
 