# Anotações sobre Presenters

## O que é?

- Uma classe que formata os dados antes de enviá-los como resposta HTTP.

## Serve para?

- Serve para expor diretamente os dados internos do domínio para o cliente, te dando controle sobre o que e como cada campo aparece na resposta;

## Tipos de portas de entrada / saída

- HTTP;
- GraphQL;
- GRPc;
- WebSocket;
- SOAP;
- Webhooks;
- AMQP / MQTT

Obs.: se tiver mais que uma forma, usar um prefixo no nome do arquivo: http-question-presenter

---------------------------------------------------------