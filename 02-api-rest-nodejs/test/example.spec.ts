import { expect, test } from 'vitest';

import supertest from 'supertest';
// importar = vai tentar subir um servidor na porta 3333
// separar inicialização/recursos do servidor
import { app } from '../src/app';

// variáveis importantes: enunciado / operação / validação
test('o usuário consegue criar uma nova transação', () => {
  // fazer a chamada HTTP p/ criar uma nova transação

  const responseStatusCode = 201

  // validação / quais expects eu vou fazer? 
  expect(responseStatusCode).toEqual(201);
})

// iniciar teste:
// - npx vitest
// obs.: para não ficar tendo que digitar, usar "test": "vitest" no package.json