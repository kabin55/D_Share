// models/File.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {filename:{
    type:String,
    required:true
  },
username: {
  type: String,
  required:true,

},
walletAddress: {
  type: String,
  required: true
},

    ipfsHash: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    privacy: {
      type: String,
      enum: ['public', 'private'],
      default: 'private'
    }
  },
  { timestamps: true }
);

export default mongoose.model('File', fileSchema);
