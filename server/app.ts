
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import cropsRoutes from './routes/crops'
import communityRoutes from './routes/community'
import analyticsRoutes from './routes/analytics'
import forecastRoutes from './routes/forecast'
import chatbotRoutes from './routes/chatbot'
import demoRoutes from './routes/demo'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:4173', 'http://localhost:5173', 'http://0.0.0.0:4173'],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/crops', cropsRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/forecast', forecastRoutes)
app.use('/api/chatbot', chatbotRoutes)
app.use('/api/demo', demoRoutes)

// Health check
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() })
})

export default app
