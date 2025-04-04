
import { z } from 'zod'

const envSchema = z.object({
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
})

const { data, success, error } = envSchema.safeParse(process.env)

if (success === false) {
  console.error('❌ Invalid environment variables', error.format())

  throw new Error('Invalid environment variables.')
}

export const env = data
