import express from 'express';
import multer from 'multer';
import ipfs from '../utils/ipfs.js';
import File from '../models/fileModel.js';

import axios from 'axios';
import FormData from 'form-data';
import stream from 'stream';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const virusTotalApiKey = process.env.VIRUSTOTAL_API_KEY;
const VIRUSTOTAL_URL = process.env.VIRUSTOTAL_URL;
const ANALYSIS_TIMEOUT = 300000;
const POLL_INTERVAL = 10000;

function bufferToStream(buffer) {
  const readable = new stream.PassThrough();
  readable.end(buffer);
  return readable;
}

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, size, buffer } = req.file;
    const { filename, description, privacy, walletAddress } = req.body;

    // Step 1: Scan file with VirusTotal
    const form = new FormData();
    form.append('file', bufferToStream(buffer), {
      filename: originalname,
      knownLength: size
    });

    const uploadResponse = await axios.post(VIRUSTOTAL_URL, form, {
      headers: {
        'x-apikey': virusTotalApiKey,
        ...form.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const fileId = uploadResponse.data.data.id;
    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${fileId}`;

    let analysisComplete = false;
    let reportResponse;
    const startTime = Date.now();

    while (!analysisComplete && Date.now() - startTime < ANALYSIS_TIMEOUT) {
      await new Promise(res => setTimeout(res, POLL_INTERVAL));
      const checkResponse = await axios.get(analysisUrl, {
        headers: { 'x-apikey': virusTotalApiKey }
      });

      if (checkResponse.data.data.attributes.status === 'completed') {
        analysisComplete = true;
        reportResponse = checkResponse;
      }
    }

    if (!analysisComplete) {
      return res.status(408).json({ error: 'VirusTotal scan timeout' });
    }

    const stats = reportResponse.data.data.attributes.stats;
    const detected = stats.malicious + stats.suspicious;

    if (detected > 3) {
      return res.status(403).json({
        status: 'rejected',
        file_status: 'MALICIOUS',
        summary: `Malicious: ${stats.malicious}, Suspicious: ${stats.suspicious}`,
        message: 'File contains malicious content'
      });
    }

    // Step 2: Upload to IPFS
    const result = await ipfs.add(buffer, { pin: true });

    const uniqueSuffix = Date.now();
    const mfsPath = `/uploads/${uniqueSuffix}_${req.file.originalname}`;

    await ipfs.files.mkdir('/uploads', { parents: true }).catch(() => {});
    await ipfs.files.cp(`/ipfs/${result.cid}`, mfsPath);
    await ipfs.pin.add(result.cid);

    const ipfsHash = result.path;
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    const localUrl = `http://127.0.0.1:8080/ipfs/${ipfsHash}`;

    // Step 3: Save metadata in MongoDB
    const newFile = await File.create({
      filename,
      description,
      privacy,
      walletAddress,
      ipfsHash,
      size,
      type: mimetype
    });

    return res.status(201).json({
      status: 'success',
      file_status: detected === 0 ? 'CLEAN' : 'SUSPICIOUS',
      ipfsHash,
      ipfsUrl,
      summary: `Malicious: ${stats.malicious}, Suspicious: ${stats.suspicious}`,
      file: newFile
    });
  } catch (err) {
    console.error("Upload or VirusTotal Error:", err);
    return res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

export default router;
