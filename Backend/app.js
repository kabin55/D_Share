import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/messages', messageRoute)

// Serve React app in production
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
// })
export default app
