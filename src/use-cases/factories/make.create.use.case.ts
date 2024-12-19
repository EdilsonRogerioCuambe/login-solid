import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { CreateUserUseCase } from '../user/create.user.use.case'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new CreateUserUseCase(usersRepository)

  return registerUseCase
}
