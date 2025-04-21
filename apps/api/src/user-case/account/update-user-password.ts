import { UnauthorizedError } from '@/errors/unauthorized-error'
import type { UserRepository } from '@/interfaces/users-repository'
import type { PrismaTokensRepository } from '@/repositories/prisma/tokens-repository'
import { hash } from 'bcryptjs'

interface UpdateUserPasswordInput {
	tokenCode: string
	newPassword: string
}

export class UpdateUserPasswordUseCase {
	constructor(
		private tokensRepository: PrismaTokensRepository,
		private userRepository: UserRepository,
	) {}

	async execute({ tokenCode, newPassword }: UpdateUserPasswordInput) {
		const token = await this.tokensRepository.findById(tokenCode)

		if (!token) {
			throw new UnauthorizedError()
		}

		const SALT = 10
		const passwordHash = await hash(newPassword, SALT)

		const user = await this.userRepository.updatePassword({
			userId: token.userId,
			password: passwordHash,
		})

		return {
			user,
		}
	}
}
