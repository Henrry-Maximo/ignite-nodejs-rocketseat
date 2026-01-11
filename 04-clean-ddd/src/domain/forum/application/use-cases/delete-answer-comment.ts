import { Either, left, right } from '@/core/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
};

// interface DeleteAnswerCommentUseCaseResponse { };
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      // throw new Error("Answer comment not found.");
      return left("Answer comment not found.")
    }

    if (answerComment.authorId.toString() !== authorId) {
      // throw new Error("Not allowed");
      return left("Not allowed.");
    }

    await this.answerCommentsRepository.delete(answerComment);

    // return {
    //   answerComment,
    // }

    return right({})
  }
}