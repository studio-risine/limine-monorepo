import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		SERVER_PORT: z.coerce.number().default(3333),
		POSTGRES_USER: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_DB: z.string(),
		JWT_SECRET: z.string(),
	},

	client: {},

	shared: {
		NEXT_PUBLIC_API_URL: z.string().url(),
	},

	emptyStringAsUndefined: true,

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		SERVER_PORT: process.env.SERVER_PORT,
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_DB: process.env.POSTGRES_DB,
		JWT_SECRET: process.env.JWT_SECRET,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
})
