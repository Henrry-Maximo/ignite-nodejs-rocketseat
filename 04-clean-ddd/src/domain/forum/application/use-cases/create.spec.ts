import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { Answer } from '../../enterprise/entities/answer.js'
import { QuestionsRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { CreateQuestionUseCase } from './create-question.js'

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
})