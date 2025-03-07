import { UserEntity,OtpEntity } from "../../entities/userEntity";

export interface IuserRepository{
    create(user:UserEntity):Promise<void>;
    findByUserEmail(email:string):Promise<UserEntity|null>
}

export interface IOtpRepositery{
    saveOtp(otp:OtpEntity):Promise<void>,
    findOtpByEmail(email:string):Promise<OtpEntity|null>,
    deleteOtpByEmail(email:string):Promise<void>
}