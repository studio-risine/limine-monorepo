import { ResourceNotFound } from '@/errors/resource-not-found'
import type { TokenRepository } from '@/interfaces/tokens-repository'
import type { UserRepository } from '@/interfaces/users-repository'

interface RequestPasswordRecoverInput {
	userEmail: string
}

export class RequestPasswordRecoverUseCase {
	constructor(
		private tokenRepository: TokenRepository,
		private userRepository: UserRepository,
	) {}

	async execute({ userEmail }: RequestPasswordRecoverInput) {
		const user = await this.userRepository.findByEmail(userEmail)

		if (!user) {
			throw new ResourceNotFound()
		}

		const token = await this.tokenRepository.create({
			userId: user.id,
			type: 'PASSWORD_RECOVER',
		})

		return {
			token,
		}
	}
}
