import "dotenv/config";
import { z } from "zod";

// process.env: { NODE_ENV: 'dev', ... }
// z.coerce: coverter o valor

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(5050),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invakud environment variables", _env.error?.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
