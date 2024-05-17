// import 'dotenv/config'; - carregar variáveis ambiente do .env
import { config } from 'dotenv' 
import { z } from 'zod'; // criar um schema

// process.env

// se o NODE_ENV for igual a teste, executar método config
if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" })
} else {
  config();
}

// console.log(process.env.NODE_ENV);
// importante: não precisa declarar no .env o NODE_ENV, pois é preenchido
// automaticamente ao executar um teste
// para que o restante do código não seja executado
// throw new Error();;

// schema: formato de dado
// z.object: process.env => DATABASE_URL (chave&valor)
const envSchema = z.object({
  // devolopment, test, production
  // em qual ambiente está rodando? | informado automaticamente pelas ferramentas (em algumas não)
  // z.enum => um dentre as opções
  DATABASE_CLIENT: z.string().default('sqlite'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  // é obrigatoriamente uma string
  DATABASE_URL: z.string(), // nullable() => valor vazio / default: obrigatório
  PORT: z.number().default(5000),
});

// parse => checar se as informações são compatíveis
// safeParse => não dispara um erro, caso a validação falhe
// export const env = envSchema.parse(process.env)

// _ => variável provisória
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format()); // format => formatar os erros

  // não continuar executando
  throw new Error('Invalid environment variables.');
};

// data => variáveis de ambiente em si
export const env = _env.data;


// obs.: um único Schema para todas as
// variáveis ambiente

// método 'parse': vai disparar um erro se o formato do valor estiver incorreto

// vários formatos de se trabalhar:
// Joi, Yup, Zod