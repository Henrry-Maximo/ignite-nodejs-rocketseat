import { randomUUID } from "node:crypto";

interface QuestionProps {
  title: string;
  content: string;
  slug: string;
  authorId: string;
}

export class Question {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não
   * fornecido - situações em que precisa atualizar um dado já existente)
   */

  public id: string;
  public title: string;
  public slug: string
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    // Object.assign(this, props)
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.slug = props.slug;
    this.authorId = props.authorId;
    this.content = props.content;
  }
}
