import { UniqueEntityID } from "@/domain/entities/value-objects/unique-entity-id";

export class Entity<Props> {
  // arquivos de foram não podem alterar o id da entidade
  private _id: UniqueEntityID;

  protected props: Props;

  // método para acessar o id
  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this.props = props;
    // this._id = id ?? randomUUID();
    this._id = new UniqueEntityID(id);
  }
}