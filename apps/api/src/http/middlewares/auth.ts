import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { fastifyPlugin } from 'fastify-plugin'

export const auth = fastifyPlugin(async (app) => {
	app.addHook('preHandler', async (request) => {
		request.getCurrentUserId = async () => {
			try {
				const { sub } = await request.jwtVerify<{ sub: string }>()

				return sub
			} catch {
				throw new InvalidCredentialsError()
			}
		}
	})
})
