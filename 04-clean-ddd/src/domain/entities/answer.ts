import { Entity } from "@/core/entities/entity";
import { randomUUID } from "node:crypto";

interface AnswerProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer extends Entity<AnswerProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não
   * fornecido - situações em que precisa atualizar um dado já existente)
  */

  // public id: string;
  // public content: string;
  // public authorId: string;
  // public questionId: string;

  get content() {
    return this.props.content
  }

  // constructor(props: AnswerProps, id?: string) {
    // this.id = id ?? randomUUID();
    // super(props, id);
    
    // this.content = props.content;
    // this.questionId = props.questionId;
    // this.authorId = props.authorId;
  // }
}
