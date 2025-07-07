export class EmailAlreadyExists extends Error {
  constructor() {
    super("Email already registered!");
  }
}
