
import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebase'

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    name: string
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    // Verify Firebase ID token
    const decodedToken = await auth.verifyIdToken(token)
    
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name || 'User'
    }

    next()
  } catch (error) {
    console.error('Token verification failed:', error)
    res.status(401).json({ error: 'Invalid token.' })
  }
}
