import { Entity } from "@/core/entities/entity";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  /**
   * @param id valor único (opcional, será gerado automaticamente se não 
   * fornecido - situações em que precisa atualizar um dado já existente)
  */
 
  // public id: string;
  // public name: string;

  // constructor(props: StudentProps, id?: string) {
    // this.id = id ?? randomUUID();
    // super(props, id);
    // this.name = props.name;
  // }
}