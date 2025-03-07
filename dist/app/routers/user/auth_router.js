"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/routers/user/authRouter.ts
const express_1 = require("express");
const user_Auth_controllers_1 = require("../../controllers/user/user_Auth_controllers");
const user_Otp_Controller_1 = require("../../controllers/user/user_Otp_Controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', user_Auth_controllers_1.signup);
authRouter.post('/login', user_Auth_controllers_1.login);
authRouter.post('/generate_otp', user_Otp_Controller_1.generateOtp);
authRouter.post('/verify_otp', user_Otp_Controller_1.verifyOtp);
exports.default = authRouter;
