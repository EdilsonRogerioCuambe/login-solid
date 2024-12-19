import { env } from '@/env'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ZodError } from 'zod'

interface UserPayload extends JwtPayload {
  sub: string
}

export async function refresh(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      res.status(401).json({ message: 'Refresh token not provided' })
      return
    }

    let decoded: UserPayload
    try {
      decoded = jwt.verify(refreshToken, env.JWT_SECRET) as UserPayload
    } catch (err) {
      res.status(401).json({ message: 'Invalid refresh token' })
      return
    }

    const { sub } = decoded

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: sub,
      expiresIn: '15m',
    })

    const newRefreshToken = jwt.sign({}, env.JWT_SECRET, {
      subject: sub,
      expiresIn: '7d',
    })

    res.cookie('refreshToken', newRefreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    })

    res.status(200).json({ token })
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: 'Validation error',
        details: err.format(),
      })
    }

    if (env.NODE_ENV === 'development') {
      console.error(err)
    } else {
      console.error((err as Error).message)
    }

    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
