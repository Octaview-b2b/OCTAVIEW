import { Router } from 'express';
import { signup, login } from '../../controllers/user/user_Auth_controllers';
import { generateOtp,verifyOtp } from '../../controllers/user/user_Otp_Controller';

const authRouter = Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/generate_otp',generateOtp)
authRouter.post('/verify_otp',verifyOtp)

export default authRouter;
 