import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './error/user.already.exists'

interface CreateUserUseCaseProps {
  id?: string
  name: string
  email: string
  password: string
  phone: string
  document: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    document,
  }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      document,
    })

    return { user }
  }
}
