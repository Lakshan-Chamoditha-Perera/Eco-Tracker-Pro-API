import { Readable } from "stream";
import { Storage } from "@google-cloud/storage";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const storageClient = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const bucketName = "eco_tracker_images";

interface UploadResult {
  success: number;
  profile_url?: string;
  message?: string;
}

export const uploadImageToStorage = (
  fileBuffer: Buffer,
  originalname: string
): Promise<UploadResult> => {
  return new Promise(async (resolve) => {
    try {
      const uniqueFilename = `${Date.now()}_${originalname}`;

      const bucket = storageClient.bucket(bucketName);
      const file = bucket.file(uniqueFilename);

      await file.save(fileBuffer);

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFilename}`;

      console.log("Image saved!");
      resolve({ success: 1, profile_url: publicUrl });
    } catch (err) {
      console.error("Error uploading to Google Cloud Storage:", err);
      resolve({ success: 0, message: "Internal server error." });
    }
  });
};
