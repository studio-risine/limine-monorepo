import { ResourceNotFound } from '@/errors/resource-not-found'
import type { UserRepository } from '@/interfaces/users-repository'

interface GetUserByEmailInput {
	email: string
}

export class GetUserByEmailUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ email }: GetUserByEmailInput) {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new ResourceNotFound()
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		}
	}
}
