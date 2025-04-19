import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { GetProfileUseCase } from '@/user-case/account/get-profile'

export function makeGetProfileUseCase() {
	const userRepository = new PrismaUsersRespository()
	const getProfileUseCase = new GetProfileUseCase(userRepository)

	return getProfileUseCase
}
