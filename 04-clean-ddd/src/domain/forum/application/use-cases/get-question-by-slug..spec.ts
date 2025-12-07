import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

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

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  })

  it('should be able to get a question by slug', async () => {
    // const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
    const newQuestion = Question.create({
      authorId: new UniqueEntityID,
      title: 'example-question',
      slug: Slug.create('example-question'),
      content: 'example content question'
    })

    await inMemoryQuestionsRepository.create(newQuestion)
  
    const { question } = await sut.execute({
      slug: 'example-question'
    })
  
    expect(question.id).toBeTruthy() // id não pode ser null/undefined, precisa ser verdadeiro
    expect(question.title).toEqual('Example question')
    expect(question.title).toEqual(newQuestion.title)
  });

})
