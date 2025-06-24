// models/File.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: String,
  walletAddress: String,
  ipfsHash: String,
  size: Number,
  type: String,
  description: String,
  privacy: { type: String, enum: ['public', 'private'], default: 'private' },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', fileSchema);
