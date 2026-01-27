import { AnswersAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentsRepository implements AnswersAttachmentsRepository {
  public items: AnswerAttachment[] = []; // lista de perguntas

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter((item) => item.answerId.toString() === answerId);

    return answerAttachments;
  }

  async deleteManyByAnswersId(answerId: string) {
    const answerAttachments = this.items.filter((item) => item.answerId.toString() !== answerId);

    this.items = answerAttachments;
  }
}