## Commands

- https://nestjs.com/
- docker-compose up -d
- pnpm prisma migrate dev
- pnpm i bcryptjs
- pnpm i zod
- pnpm i zod-validation-error
- rest client -> # POST http://localhost:3000/accounts
- variables environment -> pnpm i @nestjs/config

(tsconfig.json)
- "strict": true,
- "strictNullChecks": true,

## generate rsa256 private and public keys on windows.
- openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
- openssl rsa -pubout -in private.key -out public.key
- base64 -w 0 private.key > private_key-base64.txt

## Correção de código

- pnpm tsc --noEmit
  - Checar se há erro de typescript

- pnpm lint