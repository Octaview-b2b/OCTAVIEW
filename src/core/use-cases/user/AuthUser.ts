import { IuserRepository } from "../../interfaces/repositories/IUserRepository";
import { UserEntity } from "../../entities/userEntity";
import { HashService } from "../../../utils/HashService";
import { AuthTokenService } from "../../../utils/AuthTokenService";

export class AuthUser{
    constructor(
        private userRepository:IuserRepository,
        private hashService:HashService,
        private authTokenService:AuthTokenService,
    ){}
    async signup(email:string,password:string,companyName:string):Promise<string>{
        const existingUser = await this.userRepository.findByUserEmail(email)
        if (existingUser) {
            throw new Error("User already exists")
        }
        const hashedPassword = await this.hashService.hashPassword(password)
        const newUser = new UserEntity(email,hashedPassword,companyName)
        await this.userRepository.create(newUser)
        return this.authTokenService.generateToken({email})

    }
    async login(email:string,password:string):Promise<string>{
        const user = await this.userRepository.findByUserEmail(email)
        if (!user) {
            throw new Error("User not found")
        }
        const isPasswordValid = await this.hashService.compare(password,user.password)
        if (!isPasswordValid) {
            throw new Error("Invalid credentials")
        }
        return this.authTokenService.generateToken({email})
    }
}