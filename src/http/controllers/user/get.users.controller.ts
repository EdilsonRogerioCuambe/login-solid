import { makeGetUsersUseCase } from '@/use-cases/factories/make.get.users.use.case'
import { Request, Response, NextFunction } from 'express'

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const getUsersUseCase = makeGetUsersUseCase()
    const { users } = await getUsersUseCase.execute()

    res.status(200).json({
      users,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({
        message: error.message,
      })
    }

    next(error)
  }
}
