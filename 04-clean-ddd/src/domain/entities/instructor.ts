import { randomUUID } from "node:crypto";

export class Instructor {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não 
   * fornecido - situações em que precisa atualizar um dado já existente)
  */
 
  public id: string;
  public name: string;

  constructor(name: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
  }
}
