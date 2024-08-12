# App (técnicas de design)

GymPass style app.

## RFs (Requisitos funcionais - funcionalidades)

- Usuário deve conseguir fazer checking (Deve ser possível X)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia (core);
- [] Deve ser possível validar o check-in de um usuário; 
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio - verficações)

- Usuário deve conseguir fazer checking estando a 10 km de distância da academia

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só poder ser cadastrada por administradores;

## RNFs (Requistos não-funcionais - técnico)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas liastas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token)

## Projeto:

- npm init -y
- pasta/arquivo ´src/server.ts´
- npm install typescript @types/node tsx tsup -D(NodeJS not TS / TSUP for JS)
- npx tsc --init (TSCONFIG - ESM2020)
- npm install fastify
- "start:dev": "tsx watch src/server.ts", "start": "node build/server.js", "build": "tsup src --out-dir build"
- .npmrc - versões exatas: save-exact=true
- npm install dotenv
- "baseUrl": "./", module names. */ "paths": { "@/*": ["./src/*"]},    