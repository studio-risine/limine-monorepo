import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export const profileHeadersSchema = z.object({
	authorization: z.string(),
})

export async function profileHandler(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify()
	console.log(request.headers)
	// const { authorization } = profileHeadersSchema.parse(request.headers)

	// const [_, token] = authorization.split(' ')

	// console.log(token)

	return reply.status(200).send({
		request,
	})
}
