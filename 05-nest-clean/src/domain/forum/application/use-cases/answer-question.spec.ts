import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository.js'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
// sut: system under test

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ],
    )

    // expect(answer.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    // expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id) // verificar no array se o id coincide com o que foi cadastrado
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
