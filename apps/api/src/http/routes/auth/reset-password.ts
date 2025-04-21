import { UnauthorizedError } from '@/errors/unauthorized-error'
import { makeUpdateUserPassword } from '@/factories/make-update-user-password'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const resetPassword: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/sessions/password/reset',
		{
			schema: {
				tags: ['session'],
				summary: 'Reset password',
				description: 'Reset the password using the token',
				body: z.object({
					token: z.string(),
					password: z.string().min(6),
				}),
				response: {
					204: z.null(),
					401: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { token, password } = request.body

			const updateUserPassword = makeUpdateUserPassword()

			await updateUserPassword.execute({
				tokenCode: token,
				newPassword: password,
			})

			return reply.status(204).send()
		},
	)
}
