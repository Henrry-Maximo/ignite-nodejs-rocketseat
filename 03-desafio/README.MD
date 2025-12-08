## Orientações Desenvolvimento API
- Regras e requisitos disponibilizados;
- API para a adoção de animais;
- Aplicação utilizando SOLID e testes.

### RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar uma organização
```sh
{
    "name": "Amor & Carinho",
    "password": "123456",
    "email": "amor_carinho1@gmail.com",
    "postal_code": "06807-100",
    "address": "embu das artes",
    "phone": "(+55) 11 92424-242"
}
```

- [] Deve ser possível logar como uma organização
- [] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível cadastrar um pet
- [x] Deve ser possível cadastrar uma organização
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível listar todos as organizações
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção

### RNs (Regras de negócio)

- [] A organização não deve poder se cadastrar com um e-mail duplicado
- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### RNFs (Requisitos não-funcionais)

- [] A senha da organização precisa estar criptografada
- [] A organização deve ser identificada por um JWT (JSON Web Token)

## Commands
- npm init -y
- src -> server.ts
- npm i typescript @types/node tsx tsup -D
- npx tsc --init
- es2020
- npm install fastify
- src -> app.ts
- .gitignore
- "scripts": { "start:dev": "tsx watch src/server.ts", "start": "node build/server.js", "build": "tsup src --out-dir build" }
- .npmrc -> save-exact=true
- .env (.env.example)
- npm i dotenv
- npm i eslint @rocketseat/esling-config -D
- npm i eslint -D
- npx eslint --init
- .eslintrc.json
- "extends": {
    "@rocketseat/eslint-config/node"
  }
- .eslintignore -> node_modules / builds
- tsconfig.json -> "baseUrl": "./" / "paths": { "@/*": ["./src/*"] }
- npm o prisma -D
- npx prisma -h
- npx prisma init
- extension: prisma
- editor: "[prisma]": { "editor.formatOnSave": true }
- npx prisma generate
- docker compose up -d
- npm i @prisma/client
- docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
- npx prisma migrate dev
- npx prisma studio
- docker-compose.yml -> containers
- npm i bcryptjs
- npm i -D @types/bcryptjs
- "rules": { "camelcase": "off" }