import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(answers: Question): Promise<void>
}