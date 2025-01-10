import { Request, Response } from 'express';
import { SettingsUseCase } from '../../../core/use-cases/user/SettingsUseCase';
import { log } from 'node:console';

export class Settings_Controller {
    constructor(private settingsUseCase: SettingsUseCase) {}

    generateApiKey = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.userId;
            await this.settingsUseCase.generateApi(userId);
            res.status(201).json({ message: "API key generated successfully" });
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };

    getSettingsData = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.userId;
            const data = await this.settingsUseCase.getSettingsData(userId);
            console.log("data : ",data);
            if (data) {
                res.status(200).json(data); // Pass the data properly
            } else {
                res.status(404).json({ error: "Settings not found" });
            }
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    };
    
}
