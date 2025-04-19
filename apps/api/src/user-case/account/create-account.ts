import type { UserRepository } from '@/interfaces/users-repository'
import { EmailAlreadyExistsError } from '@errors/email-already-exists-error'
import { hash } from 'bcryptjs'
import type { User } from 'generated/prisma'

interface CreateAccountUseCaseInput {
	name: string
	email: string
	password: string
}

interface CreateAccountUseCaseOutput {
	user: User
}

export class CreateAccountUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({
		name,
		email,
		password,
	}: CreateAccountUseCaseInput): Promise<CreateAccountUseCaseOutput> {
		const emailAreadyExists = await this.userRepository.findByEmail(email)

		if (emailAreadyExists) {
			throw new EmailAlreadyExistsError()
		}

		const SALT = 10
		const passwordHash = await hash(password, SALT)

		const user = await this.userRepository.create({
			name,
			email,
			password: passwordHash,
		})

		return {
			user,
		}
	}
}
