/*
 * Erro de domínio específico: utiliza o método super da constructor de Error
 */
export class EmailAlreadyExists extends Error {
  constructor() {
    super("Email already registered!");
  }
}
