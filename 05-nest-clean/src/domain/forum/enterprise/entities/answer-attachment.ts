import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

/*
 * Contexto: como se fosse uma tabela bivô no banco de dados, quando temos o relacionamento
 * de N:N. Mas não necessariamente precisar virar uma tabela no banco de dados.
 * Motivo: na camada de domínio, serve como um caminho intermediário que possibilita realizar a conexão entre duas entidades.
 */

export interface AnswerAttachmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id)

    return attachment
  }
}
