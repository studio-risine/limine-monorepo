import { makeCreateAccountUseCase } from '@/factories/make-create-account'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createAccount: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/account',
		{
			schema: {
				body: z.object({
					name: z.string().min(2),
					email: z.string().email(),
					password: z.string().min(6),
				}),
				response: {
					201: z.string(),
				},
			},
		},

		async (request, reply) => {
			const { name, email, password } = request.body

			const createAccount = makeCreateAccountUseCase()

			const { user } = await createAccount.execute({
				name,
				email,
				password,
			})

			return reply.status(201).send()
		},
	)
}
