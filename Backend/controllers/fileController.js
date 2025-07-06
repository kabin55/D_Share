import File from '../models/fileModel.js'

//previously
// export const uploadFile = async (req,res)=>{
//     try {
//     const files = await File.find().sort({ uploadedAt: -1 }); 
//     res.json(files);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch files' });
//   }
// }
export const allFiles = async (req, res) => {
  try {
    const files = await File.find({ privacy: 'public' }).sort({
      uploadedAt: -1,
    })
    res.json(files)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch all files' })
  }
}

export const uploadFile = async (req, res) => {
  try {
    const { walletAddress } = req.query;

    if (!walletAddress) {
      return res.status(400).json({ error: "Missing walletAddress in query" });
    }

    const files = await File.find({ walletAddress }).sort({ createdAt: -1 }); // match logged-in user
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

export const getPublicFiles = async (req, res) => {
  try {
    const publicFiles = await File.find({ privacy: "public" }).sort({ createdAt: -1 });
    res.json(publicFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch public files" });
  }
};

//To fetch the file for Admin
export const getAdminFile= async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 }); // show newest first
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};


export const displayFile = async (req,res)=>{
    try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving file' });
  }
}

