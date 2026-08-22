import { Student } from '../../enterprise/entities/student'

// build do javascript não enxerga interface, utilizar uma classe abstrata

// utilizar a classe como um token no nestjs após sua compilação, um identificador.
export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
