import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { getUsersForSidebar, userData } from '../controllers/userController.js'

const router = express.Router()

router.post('/data', userData)
router.get('/', protectRoute, getUsersForSidebar)

export default router
