
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js';
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers.js';
import { makeAnswer } from 'test/factories/make-answer.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    });
  
    expect(result.value?.answers).toHaveLength(3);
  });

  it('should be able to fetch paginated paginated answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    });
  
    expect(result.value?.answers).toHaveLength(2);
  });

})
