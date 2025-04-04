import { env } from '@/config/env'
import cors from '@fastify/cors'
import { fastify } from 'fastify'

import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-accout'

const app = fastify({
  logger: true
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors)
app.register(createAccount)

app.listen({
  host: env.HOST,
  port: env.PORT
}).then(() => {
  console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
})