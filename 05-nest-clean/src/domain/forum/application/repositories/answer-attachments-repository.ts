import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(questionId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswersId(questionId: string): Promise<void>
}
