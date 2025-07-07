
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth'
import cropRoutes from './routes/crops'
import dashboardRoutes from './routes/dashboard'
import communityRoutes from './routes/community'
import analyticsRoutes from './routes/analytics'
import forecastRoutes from './routes/forecast'
import chatbotRoutes from './routes/chatbot'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/forecast', forecastRoutes)
app.use('/api/chatbot', chatbotRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AgroSaarthi Backend running on port ${PORT}`)
})

export default app
