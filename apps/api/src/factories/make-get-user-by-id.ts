import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { GetUserByIdUseCase } from '@/user-case/account/get-user-by-id'

export function makeGetUserById() {
	const userRepository = new PrismaUsersRespository()
	const userById = new GetUserByIdUseCase(userRepository)

	return userById
}
