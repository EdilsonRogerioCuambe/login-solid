import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { AuthenticateUserUseCase } from '@/use-cases/user/authenticate.use.case'
import { env } from '@/env'

export async function authenticateController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authenticateUserSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string(),
  })

  try {
    const { email, password } = authenticateUserSchema.parse(req.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '7d',
    })

    res.cookie('refreshToken', refreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    })

    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        details: error.format(),
      })
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      next(error)
    }
  }
}
