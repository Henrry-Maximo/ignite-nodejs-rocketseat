import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface AttachmentProps {
  title: string;
  link: string;
  // questionId: string; - limitando o anexo a ser de uma question
  // parentId: string; - não sabe exatamente se é uma question/answer (mas de qual tabela pegar?)
  // parentType: 'answer' | 'question'; - polimorfismo: class se comportar como duas, apenas utilizando um type
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id);

    return attachment;
  }
}