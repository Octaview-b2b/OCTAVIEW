import { Router } from "express";
import { Settings_Controller } from "../../controllers/user/Settings_Controller";
import { SettingsUseCase } from "../../../core/use-cases/user/SettingsUseCase";
import { SettingsRepository } from "../../../infrastructure/repositories/SettingsRepositery";

const settingsRepository = new SettingsRepository();
const settingsUseCase = new SettingsUseCase(settingsRepository);
const settingsController = new Settings_Controller(settingsUseCase);

const settingsRouter = Router();
settingsRouter.get('/:userId', settingsController.getSettingsData);
settingsRouter.post("/generate-api-key/:userId", settingsController.generateApiKey);

export { settingsRouter };