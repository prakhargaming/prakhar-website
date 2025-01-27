import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "SECRET!!!";
const DATABASE_NAME = "Prakharbase";
const COLLECTION_NAME = "blogs";
const IMAGES_FOLDER = path.resolve(__dirname, "pictures");

// Mapping of images to blog titles
const BLOG_IMAGE_MAP: Record<string, string> = {
  "eva1.jpg": "End of Evangelion Should (Not) Exist",
  "Parasite.jpg": "Parasite and the Human Condition",
  "senku.jpg": "Dr. Stone's Perfect Sequence"
};

async function uploadImagesToMongoDB() {
  let client = null;

  try {
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const imageFiles = fs.readdirSync(IMAGES_FOLDER);

    for (const imageFile of imageFiles) {
      const blogTitle = BLOG_IMAGE_MAP[imageFile];
      if (!blogTitle) {
        console.warn(`No blog mapping found for image: ${imageFile}`);
        continue;
      }

      const imagePath = path.join(IMAGES_FOLDER, imageFile);
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = `data:image/${path
        .extname(imageFile)
        .slice(1)};base64,${imageBuffer.toString("base64")}`;

      const result = await collection.updateOne(
        { title: blogTitle },
        { $set: { image: imageBase64 } }
      );

      if (result.matchedCount > 0) {
        console.log(`Updated blog "${blogTitle}" with image "${imageFile}"`);
      } else {
        console.warn(`No blog found with title "${blogTitle}" for image "${imageFile}"`);
      }
    }
  } catch (error) {
    console.error("Error uploading images to MongoDB:", error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

uploadImagesToMongoDB().catch((err) => console.error("Script failed:", err));
