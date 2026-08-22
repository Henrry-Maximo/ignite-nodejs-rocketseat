import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface StudentProps {
  name: string
  email: string,
  password: string,
}

export class Student extends Entity<StudentProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não
   * fornecido - situações em que precisa atualizar um dado já existente)
   */

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }


  get password() {
    return this.props.password
  }

  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }

  // public id: string;
  // public name: string;

  // constructor(props: StudentProps, id?: string) {
  // this.id = id ?? randomUUID();
  // super(props, id);
  // this.name = props.name;
  // }
}
