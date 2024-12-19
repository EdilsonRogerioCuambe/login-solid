import { makeCreateUserUseCase } from '@/use-cases/factories/make.create.use.case'
import { UserAlreadyExistsError } from '@/use-cases/user/error/user.already.exists'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createUserController(
  request: Request,
  response: Response,
): Promise<void> {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/),
    phone: z.string(),
    document: z.string().length(11),
  })

  const { name, email, password, phone, document } = registerUserSchema.parse(
    request.body,
  )

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      phone,
      document,
    })

    response.status(201).json(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      response.status(400).json({
        message: error.message,
      })
    }

    throw error
  }
}
