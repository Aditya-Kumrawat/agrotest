
import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import cropsRoutes from './routes/crops';
import communityRoutes from './routes/community';
import analyticsRoutes from './routes/analytics';
import forecastRoutes from './routes/forecast';
import chatbotRoutes from './routes/chatbot';
import demoRoutes from './routes/demo';

export function createServer(): Express {
  const app = express();

  // CORS Configuration - will be refined in a later step
  const allowedOrigins: (string | RegExp)[] = [
    'http://localhost:4173', // Vite dev default
    'http://localhost:5173', // Vite preview default
    'http://0.0.0.0:4173',   // Vite dev default (exposed)
  ];
  if (process.env.NODE_ENV === 'production') {
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    } else {
      // It's important to set FRONTEND_URL in production.
      // For now, if not set, CORS might block your frontend.
      // Consider a very restrictive default or logging a prominent warning.
      console.warn("WARNING: FRONTEND_URL is not set in production. CORS may block your frontend.");
      // To avoid accidentally allowing too much, we won't add a broad regex here.
      // allowedOrigins.push(/https:\/\/your-actual-domain\.com/); // Example if you had a fixed known domain
    }
  }

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // Check if the origin is in the allowedOrigins array (or matches a RegExp)
      if (allowedOrigins.some(allowedOrigin => typeof allowedOrigin === 'string' ? allowedOrigin === origin : allowedOrigin.test(origin))) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  }));

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/crops', cropsRoutes);
  app.use('/api/community', communityRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/forecast', forecastRoutes);
  app.use('/api/chatbot', chatbotRoutes);
  app.use('/api/demo', demoRoutes);

  // Health check
  app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
  });

  return app;
}
