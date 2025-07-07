import { Request, Response, NextFunction } from 'express'
import { supabaseClient } from '../config/supabase'

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
      return res.status(401).json({ error: 'No valid authorization header provided' })
    }

    const token = authHeader.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const { data: { user }, error } = await supabaseClient.auth.getUser(token)

    if (error) {
      console.error('Auth error:', error.message)
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authentication middleware error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}