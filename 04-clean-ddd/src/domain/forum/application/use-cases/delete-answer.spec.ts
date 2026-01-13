
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { DeleteAnswerUseCase } from './delete-answer.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);

    // await expect(() => {
    //   return 
    // }).rejects.toBeInstanceOf(Error)

  })

})
