import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import fileRoutes from './routes/fileRoute.js'

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend origin here
    credentials: true,
  })
)

app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/messages', messageRoute)
app.use('/api', uploadRoute)
app.use('/api', fileRoutes)

// Serve React app in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
})
export default app
