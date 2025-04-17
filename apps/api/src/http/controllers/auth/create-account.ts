import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const requestBodySchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
})

export function createAccount(request: FastifyRequest, replay: FastifyReply) {
	const { name, email, password } = requestBodySchema.parse(request.body)

	return replay.send({
		body: {
			name,
			email,
			password,
		},
	})
}
