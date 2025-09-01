import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID; // Melhor resposta que o autor selecionou
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não
   * fornecido - situações em que precisa atualizar um dado já existente)
   */

  // não precisa instância para chamar o método
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const question = new Question({ ...props, createdAt: new Date() }, id);

    return question;
  }

  // substituir o constructor da classe pai (preencher data de
  // criação automaticamente)
  // constructor() {
  //   super()
  // }

  // public id: string;
  // public title: string;
  // public slug: Slug
  // public content: string;
  // public authorId: string;

  // constructor(props: QuestionProps, id?: string) {
  // Object.assign(this, props)
  // this.id = id ?? randomUUID();
  // super(props, id);
  // this.title = props.title;
  // this.slug = props.slug;
  // this.authorId = props.authorId;
  // this.content = props.content;
  // }
}
