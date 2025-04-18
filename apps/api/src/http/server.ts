import { env } from '@/config/env'

import fastifyJwt from '@fastify/jwt'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { authRouter } from './controllers/routes/auth/router'
import { SessionsRouter } from './controllers/sessions/route'

export const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation Error',
			details: {
				issues: error.validation,
				method: request.method,
				url: request.url,
			},
		})
	}

	if (isResponseSerializationError(error)) {
		return reply.status(500).send({
			message: 'Internal server error',
			details: {
				issues: error.cause.issues,
				method: error.method,
				url: error.url,
			},
		})
	}

	console.error(error)

	return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

server.register(authRouter)
server.register(SessionsRouter)

server
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
	})
