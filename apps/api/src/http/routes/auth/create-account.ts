import { makeCreateAccountUseCase } from '@/factories/make-create-account'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createAccount: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/account',
		{
			schema: {
				tags: ['account'],
				summary: 'Create a new account',
				body: z.object({
					name: z.string().min(2),
					email: z.string().email(),
					password: z.string().min(6),
				}),
				response: {
					201: z.object({
						user: z.string().uuid(),
					}),
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

			return reply.status(201).send({
				user: user.id,
			})
		},
	)
}
