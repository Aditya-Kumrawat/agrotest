import { Router } from 'express';
// import pool from '../config/mysql';

const router = Router();

// router.get('/db-health', async (req, res) => {
//   try {
//     await pool.query('SELECT 1');
//     res.json({ status: 'success', message: 'Database connected!' });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: 'Database connection failed', error: error.message });
//   }
// });

export default router;
