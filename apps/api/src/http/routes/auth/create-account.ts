import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { hash } from 'bcryptjs'

export async function createAccount(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users',
		{
			schema: {
				description: 'Create a new account',
				body: z.object({
					name: z.string().min(2),
					email: z.string().email(),
					password: z.string().min(6),
				}),
			},
		},
		async (request, reply) => {
			const { name, email, password } = request.body

			const useWithSameEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			})

			if (useWithSameEmail) {
				reply.status(400).send({
					message: 'User with this email already exists',
				})
			}

			const passwordHash = await hash(password, 8)

			await prisma.user.create({
				data: {
					name,
					email,
					passwordHash,
				},
			})

			return replay.status(201).send()
		},
	)
}
