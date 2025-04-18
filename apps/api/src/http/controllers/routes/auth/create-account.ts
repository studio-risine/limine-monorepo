import { makeCreateAccountUseCase } from '@/factories/make-create-account'
import { EmailAlreadyExistsError } from '@/user-case/account/errors/email-already-exists-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createAccountBodySchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
})

export async function createAccountHandler(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const { name, email, password } = createAccountBodySchema.parse(
			request.body,
		)

		const createAccount = makeCreateAccountUseCase()

		await createAccount.execute({
			name,
			email,
			password,
		})

		return reply.status(201).send()
	} catch (error) {
		if (error instanceof EmailAlreadyExistsError) {
			return reply.status(409).send({
				message: error.message,
			})
		}
	}
}
