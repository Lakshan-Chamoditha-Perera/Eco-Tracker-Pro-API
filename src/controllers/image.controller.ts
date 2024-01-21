import express, { Request, Response } from "express";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import * as dotenv from "dotenv";
dotenv.config();

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Cloud Storage setup
const storageClient = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const bucketName = "eco_tracker_images";

Router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: express.Response) => {
    console.log("In image controller backend");
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: 0, message: "No file uploaded." });
      }

      const fileBuffer = req.file.buffer;
      const originalname = req.file.originalname;

      const bucket = storageClient.bucket(bucketName);
      const file = bucket.file(originalname);

      await file.save(fileBuffer);

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${originalname}`;

      res.json({ success: 1, profile_url: publicUrl });
      console.log("image saved!");
    } catch (err) {
      console.error("Error uploading to Google Cloud Storage:", err);
      res.status(500).json({ success: 0, message: "Internal server error." });
    }
  }
);

Router.use(
  "/images",
  express.static(`https://storage.googleapis.com/${bucketName}`)
);

export default Router;
