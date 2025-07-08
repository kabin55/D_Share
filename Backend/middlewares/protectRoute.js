import jwt from 'jsonwebtoken'
import { User } from '../models/usersModel.js'

export const protectRoute = async (req, res, next) => {
  try {
    // Read token from Authorization header, format: "Bearer <token>"
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No Token Provided' })
    }

    const token = authHeader.split(' ')[1] // Extract token string

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
    }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    req.user = user

    next()
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message)
    return res
      .status(401)
      .json({ error: 'Unauthorized - Invalid or Expired Token' })
  }
}
