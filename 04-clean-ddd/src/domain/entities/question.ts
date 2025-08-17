import { randomUUID } from "node:crypto";

export class Question {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não 
   * fornecido - situações em que precisa atualizar um dado já existente)
  */
 
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;

  constructor(title: string, content: string, authorId: string, id?: string) {
    this.id = id ?? randomUUID();
    this.title = title;
    this.authorId = authorId;
    this.content = content;
  }
}