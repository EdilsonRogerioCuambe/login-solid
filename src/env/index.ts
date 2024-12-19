import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  JWT_SECRET: z.string().default('secret'),
  PORT: z.coerce.number().default(4000),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Error parsing environment variables:', _env.error.format())
  throw new Error(_env.error.message)
}

export const env = _env.data
