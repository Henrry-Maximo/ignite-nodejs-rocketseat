// variables loading
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  NODE_PORT: z.coerce.number().default(3333),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format());

  throw new Error('Invalid environment variables.'); // Top Level
}

export const env = _env.data;
