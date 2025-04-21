import { ResourceNotFound } from '@/errors/resource-not-found'
import type { UserRepository } from '@interfaces/users-repository'

export class GetUserByIdUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(id: string) {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new ResourceNotFound()
		}

		return {
			user,
		}
	}
}
