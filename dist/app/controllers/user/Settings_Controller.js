"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings_Controller = void 0;
class Settings_Controller {
    constructor(settingsUseCase) {
        this.settingsUseCase = settingsUseCase;
        this.generateApiKey = async (req, res) => {
            try {
                const userId = req.params.userId;
                await this.settingsUseCase.generateApi(userId);
                res.status(201).json({ message: "API key generated successfully" });
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
        this.getSettingsData = async (req, res) => {
            try {
                const userId = req.params.userId;
                const data = await this.settingsUseCase.getSettingsData(userId);
                if (data) {
                    res.status(200).json(data); // Pass the data properly
                }
                else {
                    res.status(404).json({ error: "Settings not found" });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
        this.createCheckoutSession = async (req, res) => {
            try {
                const userId = req.params.userId;
                const { amount } = req.body;
                if (!userId || !amount) {
                    res.status(400).json({ error: "User ID and amount are required." });
                    return;
                }
                const url = await this.settingsUseCase.createCheckoutSession(userId, amount);
                res.status(201).json({ checkoutUrl: url });
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
        this.confirmPayment = async (req, res) => {
            try {
                const { paymentId, userId } = req.body;
                console.log(" Received:", { paymentId, userId });
                if (!paymentId || !userId) {
                    console.error(" Missing paymentId,userId");
                    res.status(400).json({ error: "Payment ID and User ID are required." });
                    return;
                }
                await this.settingsUseCase.confirmPayment(paymentId, userId);
                res.status(200).json({ message: " Payment confirmed and tokens updated successfully." });
            }
            catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
            }
        };
    }
}
exports.Settings_Controller = Settings_Controller;
