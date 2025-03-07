"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
const SettingsRepositery_1 = require("../../infrastructure/repositories/SettingsRepositery");
const settingsRepository = new SettingsRepositery_1.SettingsRepository();
const checkApiKey = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const apiKey = authorizationHeader ? authorizationHeader.split(' ')[1] : null; // Extract the token from "Bearer <apiKey>"
    const userId = req.params.userId;
    console.log('api & id', apiKey, userId);
    if (!apiKey) {
        res.status(400).json({ error: 'API key is missing' });
        return;
    }
    if (!userId) {
        res.status(400).json({ error: 'User ID is missing' });
        return;
    }
    try {
        const isValid = await settingsRepository.validateApiKey(apiKey, userId);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid API key' });
            return;
        }
        next();
    }
    catch (error) {
        console.error('Error validating API key:', error);
        res.status(500).json({ error: 'Server error' });
        return;
    }
};
exports.checkApiKey = checkApiKey;
