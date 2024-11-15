import { IOtpRepositery } from "../../core/interfaces/repositories/IUserRepository";
import { OtpEntity } from "../../core/entities/userEntity";

interface OtpStorage {
    [email: string]: OtpEntity;
}

export class OtpRepository implements IOtpRepositery{
    private otps:OtpStorage={}

    async saveOtp(otp: OtpEntity): Promise<void> {
        this.otps[otp.email]=otp
    }

    async findOtpByEmail(email: string): Promise<OtpEntity | null> {
       return this.otps[email]||null
    }
    async deleteOtpByEmail(email: string): Promise<void> {
        delete this.otps[email];
    }
}