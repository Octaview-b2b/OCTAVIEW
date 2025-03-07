"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
class OtpRepository {
    constructor() {
        this.otps = {};
    }
    async saveOtp(otp) {
        this.otps[otp.email] = otp;
        console.log("otp map: ", this.otps);
    }
    async findOtpByEmail(email) {
        console.log("Searching OTP for email:", email);
        console.log("Current OTP Map:", this.otps);
        return this.otps[email] || null;
    }
    async deleteOtpByEmail(email) {
        delete this.otps[email];
    }
}
exports.OtpRepository = OtpRepository;
