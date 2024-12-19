import { makeGetUserUseCase } from '@/use-cases/factories/make.get.user.use.case'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export async function userProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user || !req.user.sub) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const getUserUseCase = makeGetUserUseCase()

    const user = await getUserUseCase.execute(
      typeof req.user.sub === 'function' ? req.user.sub() : req.user.sub,
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    res.status(200).json(userWithoutPassword)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation error',
        details: error.format(),
      })
      return
    }

    if (error instanceof Error) {
      res.status(409).json({
        message: error.message,
      })
      return // Encerra a função após enviar a resposta de erro
    }

    next(error)
  }
}
