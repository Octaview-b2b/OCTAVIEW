import { IuserRepository } from "../../interfaces/user/IUserRepository";
import { UserEntity } from "../../entities/userEntity";
import { HashService } from "../../../utils/HashService";
import { AuthTokenService } from "../../../utils/AuthTokenService";

export class AuthUser {
    constructor(
        private userRepository: IuserRepository,
        private hashService: HashService,
        private authTokenService: AuthTokenService,
    ) {}

    async signup(email: string, password: string, companyName: string): Promise<{ token: string, user: { id: string, email: string, companyName: string } }> {
        const existingUser = await this.userRepository.findByUserEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new UserEntity("", email, hashedPassword, companyName);  

        await this.userRepository.create(newUser);

        const createdUser = await this.userRepository.findByUserEmail(email);
        if (!createdUser) {
            throw new Error("Error fetching created user");
        }

        const token = this.authTokenService.generateToken({ email });
        
        return {
            token,
            user: {
                id: createdUser.id,
                email: createdUser.email,
                companyName: createdUser.companyName
            }
        };
    }

    async login(email: string, password: string): Promise<{ token: string, user: { id: string, email: string, companyName: string } }> {
        const user = await this.userRepository.findByUserEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await this.hashService.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = this.authTokenService.generateToken({ email });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                companyName: user.companyName
            }
        };
    }
}
