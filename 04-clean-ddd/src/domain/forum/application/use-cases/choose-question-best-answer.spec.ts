
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id);
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    });
    const answer = makeAnswer({
      questionId: question.id
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)

  })

})
