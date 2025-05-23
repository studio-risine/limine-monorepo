import { ResourceNotFound } from '@/errors/resource-not-found'
import type { UserRepository } from '@interfaces/users-repository'

interface GetProfileInput {
	id: string
}

export class GetProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id }: GetProfileInput) {
		const user = await this.userRepository.findById(id)

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
