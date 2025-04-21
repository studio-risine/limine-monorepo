import { ResourceNotFound } from '@/errors/resource-not-found'
import { makeRequestPasswordRecover } from '@/factories/make-request-password-recover'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const requestPasswordRecover: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/sessions/password/revover',
		{
			schema: {
				tags: ['session'],
				summary: 'Request password recover',
				description: 'Send a link to email for recover the password',
				body: z.object({
					email: z.string().email(),
				}),
				response: {
					201: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { email } = request.body

			try {
				const requestPasswordRecorver = makeRequestPasswordRecover()

				const { token } = await requestPasswordRecorver.execute({
					userEmail: email,
				})

				/**
				 * TODO: Send email to user email with passworw recover link
				 * */
				console.log(token.id)
			} catch (error) {
				if (error instanceof ResourceNotFound) {
					return reply.status(201).send()
				}
			}
		},
	)
}
