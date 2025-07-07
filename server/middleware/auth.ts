
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
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const { data: { user }, error } = await supabaseClient.auth.getUser(token)
    
    if (error) {
      console.error('Auth error:', error)
      return res.status(401).json({ error: 'Invalid token' })
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
