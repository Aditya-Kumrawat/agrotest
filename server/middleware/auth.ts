import { Request, Response, NextFunction } from 'express'
import pool from '../config/mysql'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: any
}

export const authenticateUser = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }
    const token = authHeader.replace('Bearer ', '')
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    // Fetch user from DB
    const userId = (payload as any).id;
    const [rows] = await pool.query('SELECT id, email, name, phone FROM profiles WHERE id = ?', [userId])
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' })
  }
}
