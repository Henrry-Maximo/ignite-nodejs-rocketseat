// import 'dotenv/config'; 
// - carregar variáveis ambiente do .env
import { config } from 'dotenv' 
import { z } from 'zod'; // criar um schema

// if (process.env.NODE_ENV === "test") {
//   config({ path: ".env.test" })
// } else {
//   config();
// }

const envSchema = z.object({
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  // coerce: transforme isso em algo, não importa o tipo
  PORT: z.coerce.number().default(3333),
});

// parse => checar se as informações são compatíveis
// safeParse => não dispara um erro, caso a validação falhe
// export const env = envSchema.parse(process.env)

// _ => variável provisória
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format()); // format => formatar os erros
  throw new Error('Invalid environment variables.');
};

// data => variáveis de ambiente em si
export const env = _env.data;

// método 'parse': vai disparar um erro se o formato do valor estiver incorreto

// vários formatos de se trabalhar:
// Joi, Yup, Zod