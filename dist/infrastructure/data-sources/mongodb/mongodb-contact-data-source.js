"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../../../config/env");
const connectDb = async () => {
    try {
        const con = await mongoose_1.default.connect(env_1.MONGO_URI);
        console.log(`db connected :${con.connection.host, env_1.MONGO_URI}`);
    }
    catch (error) {
        console.error(`ERROR : ${error}`);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
