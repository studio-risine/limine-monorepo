import { PrismaTokensRepository } from '@/repositories/prisma/tokens-repository'
import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { UpdateUserPasswordUseCase } from '@/user-case/account/update-user-password'

export function makeUpdateUserPassword() {
	const userRepository = new PrismaUsersRespository()
	const tokensRepository = new PrismaTokensRepository()

	const updateUserPassword = new UpdateUserPasswordUseCase(
		tokensRepository,
		userRepository,
	)

	return updateUserPassword
}
