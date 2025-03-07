"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpUseCase = void 0;
const userEntity_1 = require("../../entities/userEntity");
const EmailTemp_1 = require("../../../utils/EmailTemp");
const crypto_1 = __importDefault(require("crypto"));
class OtpUseCase {
    constructor(otpRepositery, emailService, userRepository) {
        this.otpRepositery = otpRepositery;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }
    async generateOtp(email) {
        const existingUser = await this.userRepository.findByUserEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const expiry = Date.now() + 5 * 60 * 1000;
        const otpEntity = new userEntity_1.OtpEntity(email, otp, expiry);
        await this.otpRepositery.saveOtp(otpEntity);
        const emailHtml = EmailTemp_1.emailTemplates.otpEmail(otp);
        await this.emailService.sendEmail(email, 'OTP for verification- Octaview', emailHtml);
    }
    async verifyOtp(email, otp) {
        const otpRecord = await this.otpRepositery.findOtpByEmail(email);
        console.log("otp record..:", otpRecord);
        if (!otpRecord) {
            throw new Error("OTP not found try again");
        }
        else if (otpRecord.expiry < Date.now()) {
            await this.otpRepositery.deleteOtpByEmail(email);
            throw new Error("OTP expired");
        }
        else if (otpRecord.otp !== otp) {
            throw new Error('invalid OTP');
        }
        else {
            await this.otpRepositery.deleteOtpByEmail(email);
            return true;
        }
    }
}
exports.OtpUseCase = OtpUseCase;
