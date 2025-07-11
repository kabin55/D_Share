import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import {
  getUsersForSidebar,
  userData,
  checkUser,
  getAllUsers,
  updateBlockedStatus,
} from '../controllers/userController.js'
import { logout } from '../controllers/userController.js'

const router = express.Router()

router.post('/data', userData)
router.get('/', getAllUsers)
router.get('/', protectRoute, getUsersForSidebar)
router.post('/check', checkUser)
router.post('/logout', logout)
router.patch('/:id/block', updateBlockedStatus)

export default router
