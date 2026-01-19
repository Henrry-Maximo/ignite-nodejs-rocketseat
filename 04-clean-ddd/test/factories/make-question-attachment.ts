import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(
  override:Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const question = QuestionAttachment.create({
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override // sobrescrever qualquer informação que se tenha passado no makeQuestion
  },
  id,
  );

  return question;
}
