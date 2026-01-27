import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachment, AnswerAttachmentProps } from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachment(
  override:Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answer = AnswerAttachment.create({
    answerId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override // sobrescrever qualquer informação que se tenha passado no makeAnswer
  },
  id,
  );

  return answer;
}
