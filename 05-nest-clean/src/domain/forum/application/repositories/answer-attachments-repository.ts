import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(questionId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswersId(questionId: string): Promise<void>
}
