import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { Comment as PrismaComment, Prisma } from '@prisma/client';

// comentário de uma pergunta / comentário de uma resposta

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    // raw.
    if (!raw.answerId) {
      throw new Error("Invalid comment type."); // erro não esperado (tratativa de erro mais generalizada do framework)
    }

    return AnswerComment.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      answerId: new UniqueEntityID(raw.answerId),
      createdAt: raw.createdAt,
      updatedAt: raw.updateAt
    }, new UniqueEntityID(raw.id));
  }

  static toPrisma(answerComment: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(), // answerId sempre vai existir
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updateAt: answerComment.updatedAt,
    }
  }
}