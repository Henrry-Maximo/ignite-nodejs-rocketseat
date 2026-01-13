import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

// const fakeQuestionsRepository: QuestionsRepository = {
//   create: async (question: Question) => {},
// }

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
// sut: system under test

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    }) // factorie para criação de uma questão (utilização em outros arquivos)

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    // verificar retorno por causa da biblioteca faker (geração de dados)
    // console.log(question);

    expect(result.value?.question.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })

})
