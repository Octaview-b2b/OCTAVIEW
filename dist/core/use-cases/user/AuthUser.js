"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const userEntity_1 = require("../../entities/userEntity");
class AuthUser {
    constructor(userRepository, hashService, authTokenService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.authTokenService = authTokenService;
    }
    async signup(email, password, companyName) {
        const existingUser = await this.userRepository.findByUserEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new userEntity_1.UserEntity("", email, hashedPassword, companyName);
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
    async login(email, password) {
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
exports.AuthUser = AuthUser;
