import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { Attachment as PrismaAttachment, Prisma } from '@prisma/client';

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error("Invalid comment type.");
    }

    return QuestionAttachment.create({
      attachmentId: new UniqueEntityID(raw.id),
      questionId: new UniqueEntityID(raw.questionId)
    }, 
    new UniqueEntityID(raw.id));
  }

  /*
    toPrisma: sem necessidade, pois não há nenhum método de criação nos repositórios que peça por essa implementação
  */
}