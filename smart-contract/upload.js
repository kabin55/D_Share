import dotenv from "dotenv";
import { UploadService, AccessType } from "./index.js";

// Configure dotenv with path to .env file
dotenv.config({ path: './.env' });

async function main() {
  const uploadService = new UploadService();
  await uploadService.init(
    process.env.CONTRACT_ADDRESS,
    process.env.PRIVATE_KEY,
    process.env.SEPOLIA_RPC_URL
  );
}
//   try {
//     const fileHash = await uploadService.uploadFile({
//       fileName: "MyPDF.pdf",
//       author: "Jenish Shahi",
//       fileType: "pdf",
//       fileSize: 234567,
//       cid: "QmZEXAMPLE1234567890",
//       access: AccessType.Shared,
//       sharedWithList: [
//         "0x1234567890abcdef1234567890abcdef12345678",
//         "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
//       ],
//       uploader: "0x60072f6DaD6F7F7513c48b49387830a82C902D38",
//     });

//     if (fileHash) {
//       console.log("🎉 File uploaded successfully!");
//       console.log("📄 Transaction hash:", fileHash);
//     } else {
//       console.error("❌ File upload failed (no hash returned)");
//     }
//   } catch (error) {
//     console.error("🚨 Error in main execution:", error);
//   }
// }

// main();