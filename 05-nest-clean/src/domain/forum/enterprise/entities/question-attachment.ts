import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

/*
 * Contexto: como se fosse uma tabela bivô no banco de dados, quando temos o relacionamento
 * de N:N. Mas não necessariamente precisar virar uma tabela no banco de dados.
 * Motivo: na camada de domínio, serve como um caminho intermediário que possibilita realizar a conexão entre duas entidades.
 */

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
