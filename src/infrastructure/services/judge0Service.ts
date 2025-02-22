import axios from "axios";
import { JUDGE0_BASE_URL } from "../../config/env";



export class Judge0Service {
    static async submitCode(languageId: number, sourceCode: string, stdin: string = "") {
        try {
            const response = await axios.post(`${JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true`, {
                language_id: languageId,
                source_code: sourceCode,
                stdin: stdin,
            });

            return response.data;
        } catch (error) {
            throw new Error("Failed to submit code to Judge0");
        }
    }
}
