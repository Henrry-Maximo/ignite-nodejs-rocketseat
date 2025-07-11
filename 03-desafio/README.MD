## Orientações Desenvolvimento API
- Regras e requisitos disponibilizados;
- API para a adoção de animais;
- Aplicação utilizando SOLID e testes.

### RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar uma organização
- [x] Deve ser possível logar como uma organização
- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção

### RNs (Regras de negócio)

- [x] A organização não deve poder se cadastrar com um e-mail duplicado
- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### RNFs (Requisitos não-funcionais)

- [x] A senha da organização precisa estar criptografada