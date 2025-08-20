# App (técnicas de design)

GymPass style app (course of rocketseat).

## RFs (Requisitos funcionais - funcionalidades)

- Usuário deve conseguir fazer checking (Deve ser possível X)
- O que pode fazer

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia (core);
- [x] Deve ser possível validar o check-in de um usuário; 
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio - verficações)

- Usuário deve conseguir fazer checking estando a 10 km de distância da academia
- Pode fazer, mas seguindo uma condição

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só poder ser cadastrada por administradores;

## RNFs (Requistos não-funcionais - técnico)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

## Projeto:

- Iniciar package:
  - npm init -y

- Criar pasta/arquivo:
  - pasta/arquivo ´src/server.ts´

- Instalando ts / tsx: converter código ts para js / tsup: criar a versão de build
  - npm install typescript @types/node tsx tsup -D
(NodeJS not TS / TSUP for JS)

- Criar o arquivo tsconfig
  - npx tsc --init (TSCONFIG - ESM2020)

- npm install fastify

- "start:dev": "tsx watch src/server.ts", "start": "node build/server.js", "build": "tsup src --out-dir build"

- .npmrc - versões exatas: save-exact=true

- Carregar o arquivo .env e transformar em variáveis de ambiente
  - npm install dotenv

- Precisamos validar variáveis, garantir fluxo:
  - npm i zod

- Configurar o formatador de código:
  - npm i eslint -D
  - npx eslint --init

- "baseUrl": "./", module names. */ "paths": { "@/*": ["./src/*"]},

## Formas - Níveis de Abstração:
- Drive Native (forma nativa de sql, querys)
- Query Builder (knex): sintaxe em js para sql
- ORM (PrismaORM, SequelizeORM, TypeORM)

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
- npm i prisma -D (interface de linha de comando)
- npx: atalho (short handle) para executar scripts da pasta bin

- npx prisma init (inicializar a conexão com o banco)

- Extension Prisma and settings.json => "[prisma]": { "editor.formatOnSave": true }

- npx prisma generate (criar tipagem, integração com o ts)

- npm i @prisma/client (trabalhar com os arquivos gerados, depen. de prod)

- wsl --list --online
- wsl -l -v
- wsl --install -d Ubuntu
- docker -v
- https://hub.docker.com/search?q=bitnami
- docker ps
- docker ps -a
- docker start [name]
- docker stop [name]
- dicker rm [name]
- docker logs [name]
- docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
- docker-compose.yml (estabelece quais containers devem ser criados)
- docker compose up -d (read file yml, sem mostrar logs usando `-d`)
- docker compose stop (stop all containers)
- docker compose down (delete all containers)

## Prisma ORM Migrations Automated
- npx prisma migrate dev (buscar por alterações em prisma schema)
- npx prisma migrate deploy (pega todas as migrations e gera o banco)
- npx prisma studio (interface para nav/ entre tabelas)

## Lógica
- Não é possível inserir uma coluna como obrigatória se já existir dados no banco (deixar como opcional ou já com um valor)

## Framework - Model / View / Controller
- NestJS: controller respovesáveis por cuida da requisição e resposta ao cliente

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

## Testes
- npm i vitest vite-tsconfig-paths -D
- vite-tesconfig-paths: reconhecer as importações dos módulos

## Testes Unitários
- Testa uma unidade isolada, testar de forma desconectada das dependências
- Teste unitário nunca irá tocar em banco de dados / camada externa da aplicação
- Teste que batem no banco de dados são lentos, além  de problemas de conflito
- Teste E2E/Integração podem, mas unitário não
- Cada teste unitário precisa rodar em um contexto isolado, ou seja, sem já existir persistência de dados (ambiente limpo)

## Testes Coverage
- @vitest/coverage-v8
- vitest run --coverage : `run` para ficar observando
- fornecer um feedback dos testes rodados

## Vitest UI
- npm i -D @vitest/ui
- Visualizar os testes
- Relacionamento entre módulos

## Factory Pattern
- Utilizado quando temos uma repetição, pois teremos vários casos de uso e para usar eles, precisamos instância nosso repositório. No entanto, teremos casos de usos que receberam mais que 5 dependências
- Fábrica de criação de coisas comuns, ou seja, se tivermos um código que será utilizando em diferentes lugares, e este código tem várias dependências. Podemos aplicar o Factory Pattern.

## TDD (Test Driven Development)
- Entender e desenvolver a regra de negócio de uma funcionalidade, 
durante o desenvolvimento, tratando principalmente, de funcionalidades
complexas

## Refresh JWT Tokens
- Criação de dois tokens, um de 10 minutos e outro de 7 dias.
- Verificar se usuário acesso a aplicação.
- npm i @fastify/cookie

## Respository Pattern
- Isolar as operações do banco dos casos de uso, de forma que eventualmente, se for realizar a troca de ferramenta (prisma), apenas terá que alterar os arquivos de `repositories`

## SOLID
- D - Dependency Inversion Principle: na utilização, realizamos a instância da class, mas isso é ruim na hora de trocar o banco de dados. Portanto, criamos uma class com o método `constructor` para receber como parâmetro, a nossa conexão ao banco de dados

## ENVIRONMENT:
- Ambiente individualizado para execução de qualquer coisa
- npm i vitest@latest vite-tsconfig-paths@latest @vitest/ui@latest @vitest/coverage-v8@latest -D
- Alterar vite.config.js -> vite.config.mjs
- "test": "vitest run --dir src/use-cases",

## FAZER TESTES SIMULANDO O FRONT-END
- npm i supertest -D
- npm i @types/supertest -D