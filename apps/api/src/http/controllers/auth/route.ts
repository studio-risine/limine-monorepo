import type { FastifyInstance } from 'fastify'
import { createAccount } from './create-account'

export function authRouter(app: FastifyInstance) {
	app.post('/auth', createAccount)
}
