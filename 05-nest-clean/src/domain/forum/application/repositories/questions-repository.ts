import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null> // se a slug enviada não existir, retornar null
  findManyRecent(page: PaginationParams): Promise<Question[]>
  save(question: Question): Promise<void>
  create(answers: Question): Promise<void>
  delete(question: Question): Promise<void>
}
