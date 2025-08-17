import { randomUUID } from "node:crypto";

export class Answer {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não 
   * fornecido - situações em que precisa atualizar um dado já existente)
  */
 
  public id: string;
  public content: string;

  constructor(content: string, id?: string) {
    this.id = id ?? randomUUID();
    this.content = content;
  }
}