"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.generateOtp = void 0;
const OtpUser_1 = require("../../../core/use-cases/user/OtpUser");
const OtpRepository_1 = require("../../../infrastructure/repositories/OtpRepository");
const EmailService_1 = require("../../../utils/EmailService");
const UserRepository_1 = require("../../../infrastructure/repositories/UserRepository");
const emailService = new EmailService_1.EmailService();
const otpRepositery = new OtpRepository_1.OtpRepository();
const userRepository = new UserRepository_1.UserRepository();
const otpUsecase = new OtpUser_1.OtpUseCase(otpRepositery, emailService, userRepository);
const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email not required");
        }
        await otpUsecase.generateOtp(email);
        res.status(200).json({ message: "OTP sent to email" });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
};
exports.generateOtp = generateOtp;
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log("hit", req.body);
        if (!email || !otp)
            throw new Error("Email and OTP are required");
        await otpUsecase.verifyOtp(email, otp);
        res.status(200).json({ message: "OTP verified successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
};
exports.verifyOtp = verifyOtp;
