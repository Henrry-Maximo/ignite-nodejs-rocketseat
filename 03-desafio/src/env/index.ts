import "dotenv/config"; // object
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  SERVER_PORT: z.coerce.number().default(2424),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invakud environment variables", _env.error?.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
