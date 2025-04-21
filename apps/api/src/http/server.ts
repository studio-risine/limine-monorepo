import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import { ResourceNotFound } from '@/errors/resource-not-found'
import { UnauthorizedError } from '@/errors/unauthorized-error'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@limine/env'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { authenthicateWithEmail } from './routes/auth/authenthicate-with-email'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'

export const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Limine API',
			description: '',
			version: '0.3.0',
		},
		servers: [],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			error: 'Validation Error',
			message: error.message,
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

	if (error instanceof EmailAlreadyExistsError) {
		return reply.status(409).send({
			error: 'Validation Error',
			message: error.message,
		})
	}

	if (error instanceof UnauthorizedError) {
		return reply.status(401).send({
			error: 'Unauthorized',
			message: error.message,
		})
	}

	if (error instanceof ResourceNotFound) {
		return reply.status(404).send({
			error: 'Not found',
			message: error.message,
		})
	}

	console.error(error)

	return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

server.register(createAccount)
server.register(authenthicateWithEmail)
server.register(getProfile)
server.register(requestPasswordRecover)
server.register(resetPassword)

server
	.listen({
		host: '0.0.0.0',
		port: env.SERVER_PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server running on http://localhost:${env.SERVER_PORT}`)
	})
