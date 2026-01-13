# DDD (Domain-driven Design)

- Design dirigido à domínio
  - Transformar um problema real em software
  - Domínio: área de entendimento (todas as pessoas compreendem)

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
  - npx tsc --init
  - npm i vitest -D
  - npx vitest run
  - package:
    - "start:test": "vitest run",
    - "start:test:watch": "vitest" (observar qualquer alteração)
  - @faker-js/faker -D: pacote para gerar dados fictícios aleatórios para utilizar nos testes.
  - Purify - Functional Programming Library for TypeScript

## Conversa
  - Como **instrutor**, sinto muita dificuldade em saber as //dúvidas// dos **alunos**
  - **Eu** tenho que //responder// os **alunos** e eu me perco em quais **dúvidas** já foram respondidas

  - Verbo -> ação utilizada pelas entidades, os use-cases.
  - **Traduzir a conversa em código, de forma mais pura possível.**

## Aviso
- A estrutura utilizada com as entidades nem sempre sera a mesma no banco de dados. No caso, tendo duas entidades com IDs diferentes, mas que no banco de dados, fica tudo em uma só tabela.
- Databases: banco relaciona, não relacional, estrutura de grafos.

## Propriedades (mais que programação)
- Slug: representação do título da pergunta sem qualquer acentuação, sem caracteres especiais.
  - Útil para indexação nas buscas por motores (SEO);
  - O usuário compreende de primeiro através da URL (UX);
  - Mais legível que número, possibilidade de compartilhamento.

## Pastas:

- Domain: todo o código da aplicação, camada mais interna sem acoplamento de estrutura de persistência, framework, http, mensageria, qualquer coisa que seja das camadas externas.

## Identificador único:

- Email, SnowFlakeID, UUID, SEOID.

# Conceitos (aplicação DDD)
## Pattern 

- AggregateRoot (Aggregate): conjunto de entidadas que são manipuladas ao mesmo tempo, compondo algo maior, que chamamos de "agregados". Podendo ser na criação, remoção, atualização, etc... se comparado a entidades simples, o agregado pode fazer, tem o direito de executar certas ações.
- WatchedList: lista observada - question -> attachment[], se estamos criando uma questão e permitimos a criação de anexos, configuramos como agregados. Ou seja, ambos serão persistido ao mesmo tempo, e se optarmos por editar, também podemos alterar os anexos.

## Exemplo

- Order (entidade principal) -> OrderItem[] (subentidade)
- Order -> Shipping

### Criação

- Título
- Conteúdo
- Anexos: para cada anexo, eu crio um registro na tabela de anexos (quantidade 3)

### Edição

- Título
- Conteúdo

- Anexo: 
  - adicionar um novo anexo (create), 
  - remover o segundo anexo que tinha sido criado previamente (delete), 
  - editar um anexo existente (update);

- WatchedList: Uma classe que permite ter mais informações sobre itens de uma lista, sabendo diferença
o que foi alterado (novo/modificado). Sabemos os caminhos que podemos traçar para obter a melhor performance trabalhando com agregados que tem um watchedlist, ou seja, um array de itens.
