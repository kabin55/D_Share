import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import {
  getUsersForSidebar,
  userData,
  checkUser,
  getAllUsers,
} from '../controllers/userController.js'
import { logout } from '../controllers/userController.js'

const router = express.Router()

router.post('/data', userData)
router.get('/', protectRoute, getUsersForSidebar)
router.post('/check', checkUser)
router.post('/logout', logout)
router.get('/', getAllUsers)

export default router
