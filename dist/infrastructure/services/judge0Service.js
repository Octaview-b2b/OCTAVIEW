"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Judge0Service = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
// let url = 'http://localhost:2358'
class Judge0Service {
    static async submitCode(languageId, sourceCode, stdin = "") {
        try {
            const response = await axios_1.default.post(`${env_1.JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true`, {
                language_id: languageId,
                source_code: sourceCode,
                stdin: stdin,
            });
            console.log('res fro compailer :', response);
            return response.data;
        }
        catch (error) {
            console.error("Error details:", error);
            throw new Error("Failed to submit code to Judge0");
        }
    }
}
exports.Judge0Service = Judge0Service;
