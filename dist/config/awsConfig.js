"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResumeToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../config/env");
const crypto_1 = require("crypto");
if (!env_1.AWS_ACCESS_KEY_ID || !env_1.AWS_SECRET_ACCESS_KEY || !env_1.AWS_REGION) {
    throw new Error("Missing required AWS configuration values.");
}
const s3 = new client_s3_1.S3Client({
    region: env_1.AWS_REGION,
    credentials: {
        accessKeyId: env_1.AWS_ACCESS_KEY_ID,
        secretAccessKey: env_1.AWS_SECRET_ACCESS_KEY,
    },
});
const uploadResumeToS3 = async (file) => {
    const fileName = `${(0, crypto_1.randomBytes)(16).toString("hex")}-${file.originalname}`; // Generate a random filename using crypto
    const filePath = `resumes/${fileName}`;
    const params = {
        Bucket: env_1.AWS_BUCKET_NAME, // S3 bucket name
        Key: filePath, // S3 file path
        Body: file.buffer, // File content from buffer
        ContentType: file.mimetype, // MIME type for the file
    };
    try {
        await s3.send(new client_s3_1.PutObjectCommand(params)); // No need to store response
        const fileUrl = `https://${env_1.AWS_BUCKET_NAME}.s3.${env_1.AWS_REGION}.amazonaws.com/${filePath}`;
        return fileUrl; // Return the file URL
    }
    catch (error) {
        console.error("Error uploading file to S3", error);
        throw new Error("Error uploading resume to S3");
    }
};
exports.uploadResumeToS3 = uploadResumeToS3;
