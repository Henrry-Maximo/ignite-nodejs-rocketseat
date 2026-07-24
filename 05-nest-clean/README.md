# NestJS

- Framework opinativo ideal para pessoas que precisam de agilidade no desenvolvimento e não possuem tempo para desenvolver uma arquitetura e idealizarem quais ferramentas vão utilizar para solucionar determinado problema. O NestJS carrega um conjunto de ferramentas, feita pelos próprios desenvolvedores ou terceiros, que são recomendados para uso.
Ou seja, não há necessidade de pensar em qual ferramenta utilizar, apenas checar a documentação e entender a aplicação.
- Este projeto utiliza-se de Clean Architecture para sua construção.
## Comandos

- https://nestjs.com/

### Configuração da CLI do NestJS

- pnpm add -g @nestjs/cli
- nest new project-name
- nest -h

#### Limpeza do projeto

- Remover os arquivos: eslit, prettier, readme;
- Remover items da pasta `test`;
- Remover teste (spec) na pasta `app`;
- Checar se não há nenhum erro nos arquivos;
- No package, remover todos os script de `test`, configurações do jest, e dependências (eslint/prettier).
  - `ts-loader`, `ts-jest`, `supertest`, `prettier`, `jest`, `eslint`,
- pnpm add eslint @rocketseat/eslint-config -D
- Criar arquivo: ".eslintrc.json" com "{ "extends": "@rocketseat/eslint-config/node" }"
- pnpm run lint
- Construtores vazios: { extends:..., "rules": { "no-useless-constructor": "off" } }
- Criar arquivo: ".eslintignore" para não analisar a pasta `dist`, tendo `node_modules` e `dist`
- docker-compose up -d
- pnpm add prisma -D
- pnpm add @prisma/client
- pnpm prisma init
- pnpm prisma migrate dev
- pnpm i bcryptjs
- pnpm add @types/bcryptjs -D
- pnpm i zod
- pnpm i zod-validation-error
- rest client -> # POST http://localhost:3000/accounts
- variables environment -> pnpm i @nestjs/config

(tsconfig.json)
- "strict": true,
- "strictNullChecks": true,

- pnpm add @nestjs/passport @nestjs/jwt

## generate rsa256 private and public keys on windows.
- openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
- openssl rsa -pubout -in private.key -out public.key
- base64 -w 0 private.key > private_key-base64.txt

## Correção de código

- pnpm tsc --noEmit
  - Checar se há erro de typescript

- pnpm lint