import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from '../config/env';
import { randomBytes } from "crypto";

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

export const uploadResumeToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${randomBytes(16).toString("hex")}-${file.originalname}`;
  const filePath = `resumes/${fileName}`;

  const params = {
    Bucket: AWS_BUCKET_NAME!, 
    Key: filePath, 
    Body: file.buffer, 
    ContentType: file.mimetype, 
  };

  try {
    await s3.send(new PutObjectCommand(params)); // No need to store response

    const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${filePath}`;
    return fileUrl; 
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw new Error("Error uploading resume to S3");
  }
};
