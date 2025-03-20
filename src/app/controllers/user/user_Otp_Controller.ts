import { Request,Response } from "express";
import { OtpUseCase } from "../../../core/use-cases/user/OtpUser";
import { OtpRepository } from "../../../infrastructure/repositories/OtpRepository";
import { EmailService } from "../../../utils/EmailService";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";

const emailService = new EmailService()
const otpRepositery = new OtpRepository()
const userRepository= new UserRepository()
const otpUsecase = new OtpUseCase(otpRepositery,emailService,userRepository)

export const generateOtp=async(req:Request,res:Response)=>{
    try {
        const {email}= req.body;
        if (!email) {
            throw new Error("Email not required")
        }
        await otpUsecase.generateOtp(email)
        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) throw new Error("Email and OTP are required");
        await otpUsecase.verifyOtp(email, otp);
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}