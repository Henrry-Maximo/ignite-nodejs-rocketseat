import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { CreateQuestionUseCase } from './create-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository.js'

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

// const fakeQuestionsRepository: QuestionsRepository = {
//   create: async (question: Question) => {},
// }

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CreateQuestionUseCase
// sut: system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
      attachmentsIds: ['1', '2']
    })

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question);
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ]);

    // expect(question.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    // expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id) // verificar no array se o id coincide com o que foi cadastrado
  })

})
