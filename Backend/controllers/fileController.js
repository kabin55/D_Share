import File from '../models/fileModel.js'

export const uploadFile = async (req, res) => {
  const { username } = req.query

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    const files = await File.find({ username }).sort({ uploadedAt: -1 })
    res.json(files)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch files' })
  }
}

export const displayFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
    if (!file) return res.status(404).json({ error: 'File not found' })
    res.json(file)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error retrieving file' })
  }
}
