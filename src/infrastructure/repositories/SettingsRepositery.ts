import { UserModel } from "../data-sources/mongodb/models/User";
import { ISettings } from "../../core/interfaces/user/ISettings";

export class SettingsRepository implements ISettings {
    async createAPiKey(apiKey: string,userId:string): Promise<void> {
        const user = await UserModel.findById(userId)
        if(user){
            user.apiToken = apiKey;
            await user.save();
        }else{
            throw new Error("User not found")
        }
    }
    async getSettingsData(userId: string): Promise<any> {
        const user = await UserModel.findById(userId);
        if (user) {
            return {
             apiKey: user.apiToken,
             token : user.token
             }; 
        }
        throw new Error("User not found");
    }
    
    async validateApiKey(apiKey: string,userId:string): Promise<boolean> {
        const user = await UserModel.findOne({ _id: userId, apiToken: apiKey });
        return !!user;
    }
    
    async updateTokens(userId: string, tokens: number): Promise<void> {
        const user = await UserModel.findById(userId);
        if (user) {
            user.token = (user.token || 0) + tokens;
            await user.save();
        } else {
            throw new Error("User not found");
        }
    }
}