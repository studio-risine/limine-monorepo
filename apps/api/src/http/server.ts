import { env } from '@/config/env'
import cors from '@fastify/cors'
import { fastify } from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-accout'

const app = fastify({
	logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Limine API',
			description: '',
			version: '0.2.0',
		},
		servers: [],
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(cors)
app.register(createAccount)

app
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
	})
