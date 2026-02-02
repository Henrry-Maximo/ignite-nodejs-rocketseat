import { z } from "zod";

export const envSchema = z.object({
  DATABASE: z.url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});

// importing type using infer typescript
export type Env = z.infer<typeof envSchema>
