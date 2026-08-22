export abstract class Encrypter {
  // payload: o que quero incluir dentro da estrutura (geração do token)
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}