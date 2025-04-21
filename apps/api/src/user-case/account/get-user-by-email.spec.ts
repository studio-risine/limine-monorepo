import { InMemoryUsersRepository } from '@/repositories/in-memory-users/in-memory-users-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { CreateAccountUseCase } from './create-account'
import { GetUserByEmailUseCase } from './get-user-by-email'

let userRepository: InMemoryUsersRepository
let createAccount: CreateAccountUseCase

let sut: GetUserByEmailUseCase

describe('Get User by Email', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUsersRepository()
		createAccount = new CreateAccountUseCase(userRepository)
		sut = new GetUserByEmailUseCase(userRepository)
	})

	test('should be able to get user by email', async () => {
		const { user } = await createAccount.execute({
			name: 'John Doe',
			email: 'john-doe@acne.me',
			password: '123456',
		})

		const userByEmail = await sut.execute({
			email: user.email,
		})

		expect(userByEmail.id).toBeTypeOf('string')
	})
})
