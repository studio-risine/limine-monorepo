import { fastify } from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { authRouter } from './controllers/auth/route'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(authRouter)
