// server/index.ts or server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import cropRoutes from './routes/crops';
import dashboardRoutes from './routes/dashboard';
import communityRoutes from './routes/community';
import analyticsRoutes from './routes/analytics';
import forecastRoutes from './routes/forecast';
import chatbotRoutes from './routes/chatbot';
import demoRoute from './routes/demoRoute';
import historyRouter from './routes/history';

dotenv.config();

export function createServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Register routes
  app.use('/api/auth', authRoutes);
  app.use('/api/crops', cropRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/community', communityRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/forecast', forecastRoutes);
  app.use('/api/chatbot', chatbotRoutes);
  app.use('/api/demo', demoRoute);
  app.use('/api', historyRouter); // Mount /api/history

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
}

if (require.main === module) {
  const app = createServer();
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ AgroSaarthi Backend running on port ${PORT}`);
  });
}
