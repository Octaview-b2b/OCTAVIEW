"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const User_1 = require("../data-sources/mongodb/models/User");
class SettingsRepository {
    async createAPiKey(apiKey, userId) {
        const user = await User_1.UserModel.findById(userId);
        if (user) {
            user.apiToken = apiKey;
            await user.save();
        }
        else {
            throw new Error("User not found");
        }
    }
    async getSettingsData(userId) {
        const user = await User_1.UserModel.findById(userId);
        if (user) {
            return {
                apiKey: user.apiToken,
                token: user.token
            };
        }
        throw new Error("User not found");
    }
    async validateApiKey(apiKey, userId) {
        const user = await User_1.UserModel.findOne({ _id: userId, apiToken: apiKey });
        return !!user;
    }
    async updateTokens(userId, tokens) {
        const user = await User_1.UserModel.findById(userId);
        if (user) {
            user.token = (user.token || 0) + tokens;
            await user.save();
        }
        else {
            throw new Error("User not found");
        }
    }
}
exports.SettingsRepository = SettingsRepository;
