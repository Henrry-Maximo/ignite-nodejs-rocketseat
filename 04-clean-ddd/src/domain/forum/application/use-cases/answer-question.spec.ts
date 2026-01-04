import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { Answer } from '../../enterprise/entities/answer.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
// sut: system under test

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da pergunta',
    })

    expect(answer.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id) // verificar no array se o id coincide com o que foi cadastrado
  })

})

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

// const fakeAnswersRepository: AnswersRepository = {
//   create: async (answer: Answer) => {
//     return
//   },
// }

// test('create an answer', async () => {
//   const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

//   const answer = await answerQuestion.execute({
//     instructorId: '1',
//     questionId: '1',
//     content: 'Nova resposta',
//   })

//   expect(answer.content).toEqual('Nova resposta')
// })