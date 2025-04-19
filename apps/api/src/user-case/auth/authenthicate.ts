import { InvalidCredentialsError } from '@errors/invalid-credentials-error'
import type { UserRepository } from '@interfaces/users-repository'
import { compare } from 'bcryptjs'
import type { User } from 'generated/prisma'

interface AuthenthicateUseCaseInput {
	email: string
	password: string
}

interface AuthenthicateUseCaseOutput {
	user: User
}

export class AuthenthicateUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		email,
		password,
	}: AuthenthicateUseCaseInput): Promise<AuthenthicateUseCaseOutput> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, user.password)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
