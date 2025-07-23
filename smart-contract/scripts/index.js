require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const fs = require('fs');
const app = express();
app.use(express.json());

// Load environment
const { SEPOLIA_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// Setup Web3
const web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_RPC_URL));
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// Load ABI & Contract
const contractABI = JSON.parse(fs.readFileSync('../artifacts/contracts/DShare.sol/DShare.json')).abi;
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

// ============ ROUTES ============

// POST /upload - Upload a file and get hash
app.post('/upload', async (req, res) => {
    try {
        const { fileName, author, fileType, fileSize, cid, access, sharedWith } = req.body;

        const tx = contract.methods.uploadFile(fileName, author, fileType, fileSize, cid, access, sharedWith);
        const gas = await tx.estimateGas({ from: account.address });

        const receipt = await tx.send({ from: account.address, gas });

        const fileHash = receipt.events.FileUploaded.returnValues.fileHash;

        res.json({
            success: true,
            txHash: receipt.transactionHash,
            fileHash
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /file/:hash - Get file metadata
app.get('/file/:hash', async (req, res) => {
    try {
        const file = await contract.methods.getFile(req.params.hash).call();
        res.json({ file });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /block - Block a user
app.post('/block', async (req, res) => {
    try {
        const { user } = req.body;
        const tx = contract.methods.blockUser(user);
        const gas = await tx.estimateGas({ from: account.address });
        const receipt = await tx.send({ from: account.address, gas });

        res.json({ success: true, txHash: receipt.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /unblock - Unblock a user
app.post('/unblock', async (req, res) => {
    try {
        const { user } = req.body;
        const tx = contract.methods.unblockUser(user);
        const gas = await tx.estimateGas({ from: account.address });
        const receipt = await tx.send({ from: account.address, gas });

        res.json({ success: true, txHash: receipt.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /isBlocked/:address - Check if a user is blocked
app.get('/isBlocked/:address', async (req, res) => {
    try {
        const isBlocked = await contract.methods.isBlocked(req.params.address).call();
        res.json({ address: req.params.address, isBlocked });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
