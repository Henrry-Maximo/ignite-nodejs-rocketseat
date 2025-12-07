import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null> // se a slug enviada não existir, retornar null
  create(answers: Question): Promise<void>
}