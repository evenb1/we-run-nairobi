import ImageKit from "imagekit";
import fs from "fs";
import path from "path";

const imagekit = new ImageKit({
  publicKey: "public_nyMfUAidJlTZczJOsAvKYQsarh8=",
  privateKey: "private_yRyi0Or8tbtmhNDO1Oo4f+68cfU=",
  urlEndpoint: "https://ik.imagekit.io/znzj2xg4q",
});

const publicDir = path.join(process.cwd(), "public");

async function uploadFile(filePath, fileName, folder) {
  const fileData = fs.readFileSync(filePath);
  const base64 = fileData.toString("base64");
  const ext = path.extname(fileName).toLowerCase();

  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
  };

  const mime = mimeTypes[ext] || "application/octet-stream";

  try {
    const response = await imagekit.upload({
      file: `data:${mime};base64,${base64}`,
      fileName: fileName,
      folder: `/we-run/${folder}`,
    });
    console.log(`✅ Uploaded: ${fileName} → ${response.url}`);
    return { fileName, url: response.url };
  } catch (err) {
    console.error(`❌ Failed: ${fileName}`, err.message);
    return null;
  }
}

async function uploadDirectory(dirPath, folderName) {
  const files = fs.readdirSync(dirPath);
  const results = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const result = await uploadFile(filePath, file, folderName);
      if (result) results.push(result);
    }
  }
  return results;
}

async function main() {
  const allResults = [];

  // Upload root public files
  const rootFiles = fs.readdirSync(publicDir).filter((f) => {
    const filePath = path.join(publicDir, f);
    return fs.statSync(filePath).isFile();
  });

  for (const file of rootFiles) {
    const filePath = path.join(publicDir, file);
    const result = await uploadFile(filePath, file, "root");
    if (result) allResults.push(result);
  }

  // Upload subdirectories
  const dirs = ["BD", "karura", "kofisi", "logos", "partners", "videos"];
  for (const dir of dirs) {
    const dirPath = path.join(publicDir, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`\n📁 Uploading ${dir}...`);
      const results = await uploadDirectory(dirPath, dir);
      allResults.push(...results);
    }
  }

  // Save URL mapping
  fs.writeFileSync(
    "imagekit-urls.json",
    JSON.stringify(allResults, null, 2)
  );
  console.log("\n✅ Done! URLs saved to imagekit-urls.json");
}

main();