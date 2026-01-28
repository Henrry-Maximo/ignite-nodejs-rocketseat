
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js';
import { makeQuestionComment } from 'test/factories/make-question-comment.js';
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository.js';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error.js';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      questionCommentId: questionComment.id.toValue(),
      authorId: questionComment.authorId.toValue(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);

    // expect(() => {
    //   return 
    // })

  });

})
