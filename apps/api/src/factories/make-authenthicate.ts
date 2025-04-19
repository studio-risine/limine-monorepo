import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { AuthenthicateUseCase } from '@/user-case/auth/authenthicate'

export function makeAuthenthicateUseCase() {
	const userRepository = new PrismaUsersRespository()
	const authUseCase = new AuthenthicateUseCase(userRepository)

	return authUseCase
}
