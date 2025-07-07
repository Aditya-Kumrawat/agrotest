
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import forecastRoutes from './routes/forecast'
import communityRoutes from './routes/community'
import analyticsRoutes from './routes/analytics'
import cropsRoutes from './routes/crops'
import chatbotRoutes from './routes/chatbot'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: ['http://localhost:5000', 'http://0.0.0.0:5000', process.env.FRONTEND_URL || ''],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/forecast', forecastRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/crops', cropsRoutes)
app.use('/api/chatbot', chatbotRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgroSaarthi API is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
  console.log(`📡 API endpoints available at http://0.0.0.0:${PORT}/api`)
})
