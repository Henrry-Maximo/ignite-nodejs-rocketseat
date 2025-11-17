import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface CreateQuestionUseCaseRequest {}

interface CreateQuestionUseCaseResponse {}

export class CreateQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
  }
}