import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

// build do javascript não enxerga interface, utilizar uma classe abstrata

export abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null> // se a slug enviada não existir, retornar null
  abstract findManyRecent(page: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract create(answers: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}
