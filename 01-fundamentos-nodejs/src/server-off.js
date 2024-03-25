// módulo padrão do NodeJS
// const http = require('http');
import http from "node:http";
// obs.: colocar um prefixo interno para evidenciar os módulos nativos = interno do NodeJS

// Módulo mais famoso: Fastify
// import fastify from "fastify";

// ------------------------------------------------------------

// Padrões de Importação:
// CommonJS => REQUIRE
// ESModules => import/export

// ------------------------------------------------------------

const users = [];

// JSON - JavaScript Object Notation:
// Envio dos Dados para o Front ou outro Servidor transnformando em String

// Cabeçalhos (Requisição/Respostas) => Metadados
// - São informações para o back/front para lidar com aquela requisição, não tendo haver com os
// dados, mas sim, como aquele dado pode ser interpretado pelo front:
// setHeader("Content-type", "application/json")

// ------------------------------------------------------------

// HTTP Status Code
// 1. 100 - 199 : status code informativos
// 2. 200 - 299: status code sucessos
// 3. 300 - 399: status code redirecionamento de rota
// 4. 400 - 499: status code erro / envio de dados errados do front ao back, originando um erro
// 5. 500 - 599: status code erros inesperados / cagada no back-end

// ------------------------------------------------------------

// Criando o Servidor
// primeiro e único parâmetro = uma arrow fucntion
const server = http.createServer((request, response) => {
  // const method = req.method;
  const { method, url } = request;
  // chaves = desentruturação do objeto req

  if (method === "GET" && url === "/users") {
    return response
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));

    // Early return
    // return response.end("Listagem de Usuários");
  }

  if (method === "POST" && url === "/users") {
    users.push({ id: 1, name: "José", email: "Josesilvadias@gmail.com" });

    // return response.status(200).end(`Usuário ${users[0].name} criado com sucesso!`);
    return response.writeHead(201).end();
    // status code (201) : sucesso na criação
  }

  // console.log(method, url);

  return response.writeHead(404).end();
});

// Imagine: através do req é possível obter todas as informações de quem está chamando nosso servidor;
// já o res é pra responder quem está chamando

// ------------------------------------------------------------

// acesso a porta, executa a função server
server.listen(4444);

// ------------------------------------------------------------

// rotas = caminhos de entrada (endpoint):
// - Criar Usuários;
// - Listagem Usuários;
// - Edição de Usuários;
// - Remoção de Usuários;

// - HTTP
//   - Método HTTP
//   - URL

// Métodos Comuns do HTTP:
// GET, POST, PUT, PATCH, DELETE
// obs.: são métodos semânticos, mais do funcionais. Se pode utilizar qualquer um.

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end | vários campos ao mesmo tempo
// PATCH => Atualizar uma informação específica de um recurso do back-end | um campo em específico
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// ------------------------------------------------------------

// Stateful - Stateless

// Stateful: depende de dados na memória para seu funcionamento
// Stateless: os dados vão se manter, sem ocasionar problema
