import { IOtpRepositery } from "../../core/interfaces/user/IUserRepository";
import { OtpEntity } from "../../core/entities/userEntity";

interface OtpStorage {
    [email: string]: OtpEntity;
}

export class OtpRepository implements IOtpRepositery{
    private otps:OtpStorage={}

    async saveOtp(otp: OtpEntity): Promise<void> {
        this.otps[otp.email]=otp
        console.log("otp map: ",this.otps);
        
    }
    async findOtpByEmail(email: string): Promise<OtpEntity | null> {
        console.log("Searching OTP for email:", email);
        console.log("Current OTP Map:", this.otps);
        return this.otps[email] || null;
    }
    
    async deleteOtpByEmail(email: string): Promise<void> {
        delete this.otps[email];
    }
}