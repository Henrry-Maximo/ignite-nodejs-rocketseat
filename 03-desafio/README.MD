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

- [x] Deve ser possível logar como uma organização
```sh
{
    "email": "amor_carinho12@gmail.com",
    "password": "123456"
}
```

- [x] Deve ser possível obter o perfil de um usuário logado

- [x] Deve ser possível cadastrar um pet
```sh
{
  "name": "Roberto",
  "description": "É um gato macho e peludo.",
  "status": "AVAILABLE",
  "age": "ADULT",
  "size": "MEDIUM",
  "power": "MODERATE",
  "independence": "MEDIUM",
  "ambience": "SMALL_SPACE",
  "path": "/images/roberto.png",
  "requisites": ["É necessário ter um salário superior a 2500R$"],
  "org": "657xxx"
}
```

- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível listar todos as organizações
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção

### RNs (Regras de negócio)

- [x] A organização não deve poder se cadastrar com um e-mail duplicado
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Garantir que o acesso de administrador da ORG seja restrito a usuários logados

### RNFs (Requisitos não-funcionais)

- [x] A senha da organização precisa estar criptografada
- [x] A organização deve ser identificada por um JWT (JSON Web Token)
- [] Criar testes para validar as funcionalidades e regras de negócio

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

# Comandos para instalar o coverage

## Artigo usando pelo instrutor
- npm un @vitest/coverage-c8

## Novo coverage usando v8:
- npm i @vitest/coverage-v8 -D

## Atualizações de dependências para utilizar o test environment
- npm i vitest@latest vite-tsconfig-paths@latest @vitest/ui@latest -D