import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list';

export interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
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

  // Criação dos accessors (getters and setters): portas de entrada e saída
  // get content() {
  //   return this.props.content;
  // }

  // set content(content: string) {
  //   // validação do conteúdo
  //   if (content.length < 0) {
  //     throw new Error("Content is required.");
  //   }

  //   // if (content.length > 2400) {
  //   //   throw new Error("Invalid content length.");
  //   // }

  //   this.props.content = content;
  // }

  // getters para exibir informação
  public get authorId() {
    return this.props.authorId
  }

  public get questionId() {
    return this.props.questionId
  }

  public get content() {
    return this.props.content
  }

  public get attachments() {
    return this.props.attachments
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get updatedAt() {
    return this.props.updatedAt
  }

  public get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      { 
        ...props, 
        attachments: props.attachments ?? new AnswerAttachmentList,
        createdAt: props.createdAt ?? new Date() 
      }, 
      id
    )

    return answer
  }

  // constructor(props: AnswerProps, id?: string) {
  // this.id = id ?? randomUUID();
  // super(props, id);

  // this.content = props.content;
  // this.questionId = props.questionId;
  // this.authorId = props.authorId;
  // }
}
