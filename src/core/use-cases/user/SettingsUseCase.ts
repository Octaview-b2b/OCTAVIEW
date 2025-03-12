import { generateApiKey } from "../../../utils/GenerateApiKey";
import { ISettings } from "../../interfaces/user/ISettings";
import { Stripe } from "stripe";
import { STRIPE_SECRET_KEY } from "../../../config/env";

const stripe = new Stripe(STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
});

export class SettingsUseCase {
    constructor(private settingsRepositery : ISettings ) {}
    async generateApi(usaerId : string) { 
        const api = generateApiKey();
        console.log("apikey : ",api);
        await this.settingsRepositery.createAPiKey(api,usaerId);

    }
    async getSettingsData(userId: string): Promise<any> {
        return await this.settingsRepositery.getSettingsData(userId); 
    }


    async createCheckoutSession(userId: string, amount: number): Promise<{ sessionId: string; checkoutUrl: string }> {
        try {
            const tokenAmountMapping: Record<number, number> = {
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
                success_url: `https://octaview.tech/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://octaview.tech/dash/settings`,
                metadata: { userId, tokens: tokens.toString() }, 
            });
    
            if (!session.id || !session.url) {
                throw new Error("Failed to create checkout session.");
            }
    
            return { sessionId: session.id, checkoutUrl: session.url };
        } catch (error) {
            throw new Error("Could not create checkout session. Please try again.");
        }
    }
    
    async confirmPayment(paymentId: string, userId: string): Promise<void> {
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
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to confirm payment.");
        }
    }
    
    
  
    
}