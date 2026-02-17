const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const localRoot = './public';
const cloudinaryRoot = 'we-run-nairobi';

// Recursive function to walk through folders
async function walkAndUpload(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const localPath = path.join(dir, file);
    const stats = fs.statSync(localPath);

    if (stats.isDirectory()) {
      // If it's a folder, go deeper
      await walkAndUpload(localPath);
    } else if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      // Calculate the folder path on Cloudinary based on local structure
      // e.g., "public/avatars/user.jpg" becomes "we-run-nairobi/avatars"
      const relativePath = path.relative(localRoot, dir);
      const remoteFolder = relativePath 
        ? `${cloudinaryRoot}/${relativePath}` 
        : cloudinaryRoot;

      console.log(`📤 Uploading: ${file} to ${remoteFolder}`);

      try {
        await cloudinary.uploader.upload(localPath, {
          folder: remoteFolder,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          resource_type: 'auto'
        });
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err.message);
      }
    }
  }
}

console.log("🚀 Starting recursive upload...");
walkAndUpload(localRoot)
  .then(() => console.log("✅ All folders and images synced to Cloudinary!"))
  .catch(err => console.error("💥 Critical Error:", err));