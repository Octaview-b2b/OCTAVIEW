import { EmailService } from '../../../utils/EmailService'
import { OtpEntity } from '../../entities/userEntity'
import { IOtpRepositery } from '../../interfaces/repositories/IUserRepository'
import crypto from 'crypto'

export class OtpUseCase {
    constructor(private otpRepositery:IOtpRepositery,private emailService:EmailService) {}

    async generateOtp(email:string):Promise<void>{
        const otp = crypto.randomInt(100000, 999999).toString()
        const expiry = Date.now()+5*60*1000

        const otpEntity = new OtpEntity(email,otp,expiry)
        await this.otpRepositery.saveOtp(otpEntity)
        await this.emailService.sendEmail(email,"YOUR OTP FOR OCTAVIEW",`YOUR OTP IS ${otp}`)
    }

    async verifyOtp(email:string,otp:string):Promise<boolean>{
        const otpRecord = await this.otpRepositery.findOtpByEmail(email)
        console.log("otp record..:",otpRecord);
        
        if (!otpRecord) {
            throw new Error("OTP not found try again")
        }else if (otpRecord.expiry< Date.now()) {
            await this.otpRepositery.deleteOtpByEmail(email)
            throw new Error("OTP expired")
        }else if (otpRecord.otp !== otp) {
            throw new Error('invalid OTP')
        }else{
            await this.otpRepositery.deleteOtpByEmail(email)
            return true
        }
    }
}
