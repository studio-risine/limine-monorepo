import { env } from '@/config/env'
import { app } from './app'

app
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
	})
