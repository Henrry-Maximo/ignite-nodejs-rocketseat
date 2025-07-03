/* 
  * dotenv/config: Carrega automaticamente as variáveis do 
  arquivo .env para process.env

  * zod: Biblioteca para validação e parsing de dados com 
  TypeScript
*/
import "dotenv/config"; // object
import { z } from "zod";

const envSchema = z.object({
  // Aceita apenas "dev", "test" ou "production" (padrão: "dev")
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  
  // Converte string para número automaticamente (padrão: 2424)
  SERVER_PORT: z.coerce.number().default(2424),
});

/*
  * safeParse(): Valida sem lançar exceção
  * Se a validação falhar, exibe erro detalhado e interrompe a aplicação
*/
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error?.format());

  throw new Error("Invalid environment variables.");
}

// Exporta as variáveis validadas e tipadas para uso na 
// aplicação.
export const env = _env.data;
