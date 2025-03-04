import express, { Router } from "express";
import { Settings_Controller } from "../../controllers/user/Settings_Controller";
import { SettingsUseCase } from "../../../core/use-cases/user/SettingsUseCase";
import { SettingsRepository } from "../../../infrastructure/repositories/SettingsRepositery";
import { authenticateUser } from "../../middlewares/AuthMIddleware";

const settingsRepository = new SettingsRepository();
const settingsUseCase = new SettingsUseCase(settingsRepository);
const settingsController = new Settings_Controller(settingsUseCase);

const settingsRouter = Router();
settingsRouter.get('/:userId',authenticateUser, settingsController.getSettingsData);
settingsRouter.post("/generate-api-key/:userId",authenticateUser, settingsController.generateApiKey);
settingsRouter.post("/purchase-tokens/:userId", authenticateUser, settingsController.createCheckoutSession);
settingsRouter.post("/success", authenticateUser,settingsController.confirmPayment );

export { settingsRouter };