import { PrismaUsersRespository } from '@/repositories/prisma/users-repository'
import { CreateAccountUseCase } from '@/user-case/account/create-account'

export function makeCreateAccountUseCase() {
	const userRepository = new PrismaUsersRespository()
	const createAccount = new CreateAccountUseCase(userRepository)

	return createAccount
}
