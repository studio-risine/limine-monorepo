import { makeGetProfileUseCase } from '@/factories/make-get-profile'
import { auth } from '@/http/middlewares/auth'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getProfile: FastifyPluginAsyncZod = async (app) => {
	app.register(auth).get(
		'/me',
		{
			schema: {
				tags: ['auth'],
				response: {
					200: z.object({
						user: z.object({
							id: z.string().uuid(),
							name: z.string(),
							email: z.string().email(),
						}),
					}),
				},
			},
		},
		async (request, reply) => {
			const userId = await request.getCurrentUserId()

			const profile = makeGetProfileUseCase()

			const user = await profile.execute({ id: userId })

			return reply.status(200).send({ user })
		},
	)
}
