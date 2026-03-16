import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_nyMfUAidJlTZczJOsAvKYQsarh8=",
  privateKey: "private_yRyi0Or8tbtmhNDO1Oo4f+68cfU=",
  urlEndpoint: "https://ik.imagekit.io/znzj2xg4q",
});

const files = [
  { name: "3.jpg", url: "https://werunnairobi.vercel.app/BD/3.jpg" },
  { name: "4.jpg", url: "https://werunnairobi.vercel.app/BD/4.jpg" },
  { name: "5.jpg", url: "https://werunnairobi.vercel.app/BD/5.jpg" },
];

async function main() {
  for (const file of files) {
    try {
      const response = await imagekit.upload({
        file: file.url,
        fileName: file.name,
        folder: "/we-run/BD",
        overwriteFile: true,
      });
      console.log(`✅ ${file.name} → ${response.url}`);
    } catch (err) {
      console.error(`❌ ${file.name}:`, err.message);
    }
  }
}

main();