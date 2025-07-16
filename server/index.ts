
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import historyRoutes from './routes/history'
import analyticsRoutes from './routes/analytics'
import dashboardRoutes from './routes/dashboard'
import communityRoutes from './routes/community'
import forecastRoutes from './routes/forecast'
import chatbotRoutes from './routes/chatbot'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/forecast', forecastRoutes)
app.use('/api/chatbot', chatbotRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running with Firebase!' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
