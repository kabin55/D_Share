import File from '../models/fileModel.js'

// ✅ This should probably be renamed to `getUserFiles`
export const getUserFiles = async (req, res) => {
  const { username } = req.query

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    const files = await File.find({ username }).sort({ uploadedAt: -1 })
    res.json(files)
    console.log(`Fetched files for user: ${username}`)
    console.log(files)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch user files' })
  }
}

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

// ✅ Single file display
export const displayFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }
    res.json(file)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error retrieving file' })
  }
}
