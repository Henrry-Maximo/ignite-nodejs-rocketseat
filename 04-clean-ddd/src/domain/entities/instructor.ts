import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não
   * fornecido - situações em que precisa atualizar um dado já existente)
   */

  static create(props: InstructorProps, id?: UniqueEntityID) {
    const insctructor = new Instructor(props, id);

    return insctructor;
  }

  // public id: string;
  // public name: string;

  // constructor(props: InstructorProps, id?: string) {
  // this.id = id ?? randomUUID();
  // super(props, id);
  // this.name = props.name;
  // }
}
