import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the compiled contract JSON
const compiledPath = path.join(__dirname, "artifacts", "contracts", "DShare.sol", "DShare.json");
const compiled = JSON.parse(fs.readFileSync(compiledPath, "utf8"));

export const AccessType = {
  Private: 0,
  Public: 1,
  Shared: 2,
};

export class UploadService {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
  }

  async init(contractAddress, privateKey, rpcUrl) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, compiled.abi, this.wallet);
  }

  async uploadFile({
    fileName,
    author,
    fileType,
    fileSize,
    cid,
    access = AccessType.Private,
    sharedWithList = [],
    uploader,
  }) {
    try {
      const tx = await this.contract.uploadFile(
        fileName,
        author,
        fileType,
        fileSize,
        cid,
        access,
        sharedWithList,
        uploader
      );

      console.log("⏳ Waiting for transaction confirmation...");
      console.log("Transaction hash:", tx.hash);
      const receipt = await tx.wait();

      for (const log of receipt.logs) {
        try {
          const parsed = this.contract.interface.parseLog(log);
          if (parsed?.name === "FileUploaded") {
            const fileHash = parsed.args.fileHash;
            console.log("✅ File hash:", fileHash);
            return fileHash;
          }
        } catch {
          continue;
        }
      }

      console.error("❌ FileUploaded event not found.");
      return null;
    } catch (err) {
      console.error("❌ Upload failed:", err);
      return null;
    }
  }
}
