import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })
  console.log(token)

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict', // Allow cookies in development
    secure: process.env.NODE_ENV === 'production', // Only secure in production
  })
}

export default generateTokenAndSetCookie
