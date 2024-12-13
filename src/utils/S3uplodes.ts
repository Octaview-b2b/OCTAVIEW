import { s3 } from "../config/awsConfig";
import { randomBytes } from "crypto"; 
import { Express } from "express";

// Function to upload file to S3
export const uploadResumeToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${randomBytes(16).toString("hex")}-${file.originalname}`; // Generate a random filename using crypto
  const filePath = `resumes/${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // to make the file publicly accessible
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location; // Return the file URL
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw new Error("Error uploading resume to S3");
  }
};
