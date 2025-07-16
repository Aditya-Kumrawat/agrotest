
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    name: string
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    ;(req as AuthenticatedRequest).user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name
    }

    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' })
  }
}
