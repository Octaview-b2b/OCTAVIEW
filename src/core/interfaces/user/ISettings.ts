import { UserModel } from "../../../infrastructure/data-sources/mongodb/models/User";

export interface ISettings {
    createAPiKey(apiKey: string,userId : string): Promise<void>;
    getSettingsData(userId: string): Promise<any>;
    validateApiKey(apiKey: string,userId:string): Promise<boolean>;
}