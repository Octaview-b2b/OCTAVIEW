import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY ,AWS_BUCKET_NAME} from '../config/env';
import { randomBytes } from "crypto"; 
import { Express } from "express";

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
  throw new Error("Missing required AWS configuration values.");
}

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload file to S3
export const uploadResumeToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${randomBytes(16).toString("hex")}-${file.originalname}`; // Generate a random filename using crypto
  const filePath = `resumes/${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!, // S3 bucket name
    Key: filePath, // S3 file path
    Body: file.buffer, // File content from buffer
    ContentType: file.mimetype, // MIME type for the file
    ACL: ObjectCannedACL.public_read, // Use the correct constant from the SDK
  };

  try {
    // Upload file using v3 syntax (PutObjectCommand instead of upload)
    const command = new PutObjectCommand(params);
    const s3Response = await s3.send(command);
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${filePath}`;
    return fileUrl; // Return the file URL
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw new Error("Error uploading resume to S3");
  }
};