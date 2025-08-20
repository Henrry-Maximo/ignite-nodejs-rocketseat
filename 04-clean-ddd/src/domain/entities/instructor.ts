import { Entity } from "@/core/entities/entity";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não 
   * fornecido - situações em que precisa atualizar um dado já existente)
  */
 
  // public id: string;
  // public name: string;

  // constructor(props: InstructorProps, id?: string) {
    // this.id = id ?? randomUUID();
    // super(props, id);
    // this.name = props.name;
  // }
}
