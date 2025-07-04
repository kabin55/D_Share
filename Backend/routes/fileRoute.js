import express from 'express'
// import protectRoute from '../middlewares/protectRoute.js';
import {
  displayFile,
  getUserFiles,
  allFiles,
} from '../controllers/fileController.js'

const router = express.Router()

// 🔹 Get all files (admin/general view)
router.get('/files', allFiles)

// 🔹 Get files by username (e.g., /files/user?username=rahul)
router.get('/individualFiles', getUserFiles)

// 🔹 Get individual file by ID
router.get('/files/:id', displayFile)

export default router
