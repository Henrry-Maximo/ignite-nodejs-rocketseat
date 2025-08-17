# DDD (Domain-driven Design)

- Design dirigido à domínio

## Domínio

- Domain Experts
  - Pessoas que compreendem a problemática (Se você não está fazendo para si mesmo, está desenvolvendo o software para quem está lidando no dia a dia);
    - Conversa -> com um ou vários experts de domínio.

- Linguagem ubíqua (linguagem de domínio)
  - Todas as pessoas juntas, para a resolução do problema, irão conversar por igual. Exemplo prático, entidade "usuário" chamada assim pelo dev, mas pelo cliente, é chamado de cliente/fornecedor/atendente/bar-man.

Design de software: sair do código, e olhar para o desenho do software.

## Conceitos que serão abordados:
- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso

## Pontos-Chave

Design de Software ≠ Arquitetura de Software
- Design: como representar o problema real no código (abstrações, entidades, casos de uso).
- Arquitetura: estrutura e organização do sistema (MVC, Clean Architecture etc.).

Independência entre conceitos
- Podemos usar Clean Architecture sem DDD.
- Podemos aplicar DDD sem Clean Architecture.
- Ou até usar nenhum deles e ainda ter um software bem estruturado (ex.: só MVC).

Processo do Design de Software
- Do problema real → para abstrações de software.
- Pode levar tempo, muitas decisões acontecem antes do código.
- O objetivo é traduzir o domínio do negócio para algo que faça sentido no código.

Premissa do DDD
- Criar artefatos (diagramas, docs, código) que qualquer pessoa do negócio compreenda.
- Uso da linguagem ubíqua: termos claros e consistentes no código e no negócio.
- O código deve refletir o domínio de forma legível até para não-programadores.

Arquitetura Limpa -> Construir a camada que o usuário toca (framework, banco de dados) até a camada de aplicação, de entidades (domínio), código mais limpo possível.
  - Camada mais externa para a mais interna.

Projeto:
  - Desenvolvimento de um forum.

Comandos:
  - npm init -y (criar package)
  - npm i typescript @types/node -D (instalar o typescript)
  -    (inicializar typescript)
  - npm i vitest -D
  - npx vitest run

## Conversa
  - Como **instrutor**, sinto muita dificuldade em saber as //dúvidas// dos **alunos**
  - **Eu** tenho que //responder// os **alunos** e eu me perco em quais **dúvidas** já foram respondidas

  - Verbo -> ação utilizada pelas entidades, os use-cases.
  - **Traduzir a conversa em código, de forma mais pura possível.**
