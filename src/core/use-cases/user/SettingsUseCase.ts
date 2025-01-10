import { generateApiKey } from "../../../utils/GenerateApiKey";
import { ISettings } from "../../interfaces/user/ISettings";

export class SettingsUseCase {
    constructor(private settingsRepositery : ISettings ) {}
    async generateApi(usaerId : string) { 
        const api = generateApiKey();
        console.log("apikey : ",api);
        await this.settingsRepositery.createAPiKey(api,usaerId);

    }
    async getSettingsData(userId: string): Promise<any> {
        return await this.settingsRepositery.getSettingsData(userId); // Ensure you're returning the data from the repository
    }
    
}