import { CreateQuestionUseCase } from './create-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

/*
create: async function (answer: Answer): Promise<void> {
  return;
}
*/

// const fakeQuestionsRepository: QuestionsRepository = {
//   create: async (question: Question) => {},
// }

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
// sut: system under test

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  })

  it('should be able to create a question', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
  
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })
  
    expect(question.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id) // verificar no array se o id coincide com o que foi cadastrado 
  });

})
