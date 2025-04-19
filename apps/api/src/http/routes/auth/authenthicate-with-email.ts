import { makeAuthenthicateUseCase } from '@/factories/make-authenthicate'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const authenthicateWithEmail: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/sessions/password',
		{
			schema: {
				body: z.object({
					email: z.string().email(),
					password: z.string().min(6),
				}),
				response: {
					201: z.object({
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body

			const authenthicate = makeAuthenthicateUseCase()

			const { user } = await authenthicate.execute({ email, password })

			const token = await reply.jwtSign(
				{
					sub: user.id,
				},
				{
					sign: {
						expiresIn: '7d',
					},
				},
			)

			return reply.status(201).send({
				token,
			})
		},
	)
}
