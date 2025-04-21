import { InMemoryTokensRepository } from '@/repositories/in-memory-users/in-memory-tokens-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users/in-memory-users-repository'
import { beforeEach, describe, test } from 'vitest'
import { CreateAccountUseCase } from './create-account'
import { CreatePasswordRecoverUseCase } from './request-password-recover'

let userRepository: InMemoryUsersRepository
let createAccount: CreateAccountUseCase
let tokenRepository: InMemoryTokensRepository
let sut: CreatePasswordRecoverUseCase

describe('Create password recover use case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository()
		createAccount = new CreateAccountUseCase(userRepository)
		tokenRepository = new InMemoryTokensRepository()

		sut = new CreatePasswordRecoverUseCase(tokenRepository)
	})

	test('should be able to create password recover', async () => {
		const { user } = await createAccount.execute({
			name: 'John Doe',
			email: 'john-doe@acne.me',
			password: '123456',
		})

		const { token } = await sut.execute({
			userEmail: user.email,
		})

		console.log(token.id)
	})
})
