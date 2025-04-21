import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { GetUserByEmailUseCase } from '@/user-case/account/get-user-by-email'

export function makeGetUserFromEmail() {
	const userRepository = new PrismaUsersRespository()
	const userByEmail = new GetUserByEmailUseCase(userRepository)

	return userByEmail
}
