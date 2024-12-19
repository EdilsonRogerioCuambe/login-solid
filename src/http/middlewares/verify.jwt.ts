import { env } from '@/env'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: {
    sub: string
  }
}

export function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload & {
      sub: string
    }
    ;(req as AuthenticatedRequest).user = { sub: decoded.sub }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
