import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users.repository'

export class GetUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
