import { ethers } from "ethers";
import DShare from "../../../smart-contract/artifacts/contracts/DShare.sol/DShare.json";

const contractAddress = "0x8e2FA74163f123B2800C78b6C70962E7233236f6";

export async function getContract() {
  if (!window.ethereum) throw new Error("Metamask not found");

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, DShare.abi, signer);
}

export async function downloadFileByHash(fileHash) {
  try {
    const contract = await getContract();
    const file = await contract.getFile(fileHash);

    const cid = file.cid;
    console.log("✅ CID:", cid);
    console.log("📁 Full file object:", file);

    const localIpfsUrl = `http://localhost:8080/ipfs/${cid}`;
    console.log("🌐 IPFS URL:", localIpfsUrl);

    // Uncomment this line if you want to open the file too
    // window.open(localIpfsUrl, "_blank");
  } catch (error) {
    console.error("❌ Smart contract error:", error);

    if (error.error && error.error.message) {
      console.error("Contract revert reason:", error.error.message);
    } else if (error.reason) {
      console.error("Contract revert reason:", error.reason);
    } else if (error.data && error.data.message) {
      console.error("Contract error (data.message):", error.data.message);
    }
  }
}

// ✅ Auto-run test
// window.addEventListener("DOMContentLoaded", async () => {
//   const testHash = "0x24c3c1697bdaeb62f188f58c975a89faba822ddbe2fa8fdd685bbc4f8748c248"; // 🟡 Replace with real keccak256 file hash
//   console.log("🚀 Testing file download for hash:", testHash);
//   await downloadFileByHash(testHash);
// });