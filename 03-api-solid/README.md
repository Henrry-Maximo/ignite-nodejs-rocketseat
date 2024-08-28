# App (técnicas de design)

GymPass style app.

## RFs (Requisitos funcionais - funcionalidades)

- Usuário deve conseguir fazer checking (Deve ser possível X)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia (core);
- [] Deve ser possível validar o check-in de um usuário; 
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio - verficações)

- Usuário deve conseguir fazer checking estando a 10 km de distância da academia

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só poder ser cadastrada por administradores;

## RNFs (Requistos não-funcionais - técnico)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
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

## ORMs

- ORM - Object Relational Mapper
- Sequeliza
class User {
  name: string
  email: string
}
- TypeORM
@Entity() - decoretor (table database)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string
}

## Prisma ORM
- Duplicidade/Integração-TS/Inferir database/Column
- Supported Languages: JS/TS
- Supported Databases: PostgreSQL/MySQL/SQLite/SQLServer/MongoDB/CockroachDB
- Automated Migrations
- npm i prisma -D
- npx prisma generate
- wsl --list --online
- wsl -l -v
- wsl --install -d Ubuntu
- docker -v
- docker ps
- docker ps -a
- docker start [name]
- docker stop [name]
- dicker rm [name]
- docker logs [name]
- docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
- docker compose up -d (read file yml)
- docker compose stop (stop all containers)
- docker compose down (delete all containers)

## Prisma ORM Migrations Automated
- npx prisma migrate dev
- npx prisma studio

## HTTP (Controllers)
- Fastify Plugin Routes

## Layered Structure
- Typing of data using zod
- Parseamento
- Return

## Password Hash
- npm i bcryptjs
- npm i -D @types/bcryptjs
- salt -> random string/number

## TDD (Test Driven Development)
- Entender e desenvolver a regra de negócio de uma funcionalidade, 
durante o desenvolvimento, tratando principalmente, de funcionalidades
complexas
