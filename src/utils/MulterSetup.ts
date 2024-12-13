import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Set up Multer storage
const storage = multer.memoryStorage(); // Store file in memory before uploading to S3
const upload = multer({ storage: storage });

// Middleware to handle file upload (max 5MB for example)
const uploadResume = upload.single("resume");

export { uploadResume };
