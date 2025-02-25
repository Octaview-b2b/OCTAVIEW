import { EmailService } from '../../../utils/EmailService'
import { OtpEntity } from '../../entities/userEntity'
import { IOtpRepositery } from '../../interfaces/user/IUserRepository'
import { IuserRepository } from '../../interfaces/user/IUserRepository'
import { emailTemplates } from '../../../utils/EmailTemp'
import crypto from 'crypto'

export class OtpUseCase {
    constructor(private otpRepositery:IOtpRepositery,private emailService:EmailService,private userRepository:IuserRepository) {}

    async generateOtp(email:string):Promise<void>{
        const existingUser = await this.userRepository.findByUserEmail(email)
        if (existingUser) {
            throw new Error("User already exists")
        }
        const otp = crypto.randomInt(100000, 999999).toString()
        const expiry = Date.now()+5*60*1000

        const otpEntity = new OtpEntity(email,otp,expiry)
        await this.otpRepositery.saveOtp(otpEntity)
        const emailHtml = emailTemplates.otpEmail(otp)
        await this.emailService.sendEmail(email,'OTP for verification- Octaview',emailHtml)
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
