import { UniqueEntityID } from './unique-entity-id'

// class base of entity
export abstract class Entity<Props> {
  // arquivos de foram não podem alterar o id da entidade
  private _id: UniqueEntityID

  protected props: Props

  // método para acessar o id
  public get id() {
    return this._id
  }

  // protected -> só pode ser chamado pela classe própria ou as que herdam
  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    // this._id = id ?? randomUUID();
    this._id = id ?? new UniqueEntityID()
  }
}