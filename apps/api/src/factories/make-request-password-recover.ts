import { PrismaTokensRepository } from '@/repositories/prisma/tokens-repository'
import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { RequestPasswordRecoverUseCase } from '@/user-case/account/request-password-recover'

export function makeRequestPasswordRecover() {
	const userRepository = new PrismaUsersRespository()
	const tokenRepository = new PrismaTokensRepository()

	const requestPasswordRecorver = new RequestPasswordRecoverUseCase(
		tokenRepository,
		userRepository,
	)

	return requestPasswordRecorver
}
