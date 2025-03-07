"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Unauthorized: Token has expired' });
            }
            else if (err.name === 'JsonWebTokenError') {
                res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
exports.authenticateUser = authenticateUser;
