// server/app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import predictRoute from './routes/predict.js';

dotenv.config();

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Health check route
  app.get('/', (req, res) => {
    res.send('🌾 AgroSaarthi API is working');
  });

  // Main API routes
  app.use('/api', predictRoute);

  return app;
}
