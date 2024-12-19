import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { GetUsersUseCase } from '../user/get.users.use.case'

export function makeGetUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUsersUseCase = new GetUsersUseCase(usersRepository)

  return getUsersUseCase
}
