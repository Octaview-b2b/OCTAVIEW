"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const AuthUser_1 = require("../../../core/use-cases/user/AuthUser");
const UserRepository_1 = require("../../../infrastructure/repositories/UserRepository");
const HashService_1 = require("../../../utils/HashService");
const AuthTokenService_1 = require("../../../utils/AuthTokenService");
const userRepository = new UserRepository_1.UserRepository();
const hashService = new HashService_1.HashService();
const authTokenService = new AuthTokenService_1.AuthTokenService();
const authuser = new AuthUser_1.AuthUser(userRepository, hashService, authTokenService);
const signup = async (req, res) => {
    try {
        const { email, password, companyName } = req.body;
        const { token, user } = await authuser.signup(email, password, companyName);
        res.status(201).json({ token, user });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authuser.login(email, password);
        res.status(200).json({ token, user });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
};
exports.login = login;
