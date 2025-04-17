import { InMemoryUsersRepository } from '@repositories/in-memory-users/users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, test } from 'vitest'
import { CreateAccountUseCase } from './create-account'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

let userRepository: InMemoryUsersRepository
let sut: CreateAccountUseCase

describe('Create account use case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository()
		sut = new CreateAccountUseCase(userRepository)
	})

	test('should be able to create account', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john-doe@acne.me',
			password: '123456',
		})

		expect(user.id).toBeTypeOf('string')
	})

	test('should hash user passaword upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john-doe@acne.me',
			password: '123456',
		})

		const isPasswordCorrectlyHased = await compare('123456', user.password)

		expect(isPasswordCorrectlyHased).toBeTruthy()
	})

	test('should not be able to register with same email twice', async () => {
		const user = {
			name: 'John Doe',
			email: 'john-doe@acne.me',
			password: '123456',
		}

		await sut.execute(user)

		await expect(async () => await sut.execute(user)).rejects.toBeInstanceOf(
			EmailAlreadyExistsError,
		)
	})
})
