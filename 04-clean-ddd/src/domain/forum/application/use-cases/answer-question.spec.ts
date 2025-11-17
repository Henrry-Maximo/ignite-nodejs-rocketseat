import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { Answer } from '../../enterprise/entities/answer.js'

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})