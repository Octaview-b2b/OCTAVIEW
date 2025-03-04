import { UserModel } from "../../../infrastructure/data-sources/mongodb/models/User";

export interface ISettings {
    updateTokens(userId: any, tokens: number): unknown;
    createAPiKey(apiKey: string,userId : string): Promise<void>;
    getSettingsData(userId: string): Promise<any>;
    validateApiKey(apiKey: string,userId:string): Promise<boolean>;
}