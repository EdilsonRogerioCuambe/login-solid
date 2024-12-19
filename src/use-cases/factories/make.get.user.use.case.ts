import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { GetUserUseCase } from '../user/get.user.use.case'

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(usersRepository)

  return getUserUseCase
}
