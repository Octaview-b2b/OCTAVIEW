"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsUseCase = void 0;
const GenerateApiKey_1 = require("../../../utils/GenerateApiKey");
const stripe_1 = require("stripe");
const env_1 = require("../../../config/env");
const stripe = new stripe_1.Stripe(env_1.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
});
class SettingsUseCase {
    constructor(settingsRepositery) {
        this.settingsRepositery = settingsRepositery;
    }
    async generateApi(usaerId) {
        const api = (0, GenerateApiKey_1.generateApiKey)();
        console.log("apikey : ", api);
        await this.settingsRepositery.createAPiKey(api, usaerId);
    }
    async getSettingsData(userId) {
        return await this.settingsRepositery.getSettingsData(userId);
    }
    async createCheckoutSession(userId, amount) {
        try {
            const tokenAmountMapping = {
                50: 1000,
                125: 3000,
                200: 5000
            };
            const tokens = tokenAmountMapping[amount] || 0;
            if (tokens === 0) {
                throw new Error("Invalid amount selected.");
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: { name: `${tokens} API Tokens` },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:5173/dash/settings`,
                metadata: { userId, tokens: tokens.toString() },
            });
            if (!session.id || !session.url) {
                throw new Error("Failed to create checkout session.");
            }
            return { sessionId: session.id, checkoutUrl: session.url };
        }
        catch (error) {
            throw new Error("Could not create checkout session. Please try again.");
        }
    }
    async confirmPayment(paymentId, userId) {
        try {
            // Retrieve the Stripe session
            const session = await stripe.checkout.sessions.retrieve(paymentId);
            if (!session) {
                throw new Error(" No checkout session found.");
            }
            if (session.payment_status !== "paid") {
                throw new Error(` Payment status is not successful: ${session.payment_status}`);
            }
            if (!session.metadata) {
                throw new Error(" Missing metadata in checkout session.");
            }
            const tokens = Number(session.metadata.tokens);
            if (isNaN(tokens) || tokens <= 0) {
                throw new Error(" Invalid token amount in payment metadata.");
            }
            console.log(` Payment successful! Adding ${tokens} tokens to user ${userId}`);
            await this.settingsRepositery.updateTokens(userId, tokens);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to confirm payment.");
        }
    }
}
exports.SettingsUseCase = SettingsUseCase;
