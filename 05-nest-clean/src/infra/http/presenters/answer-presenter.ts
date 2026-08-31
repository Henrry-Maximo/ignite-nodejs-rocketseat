import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class AnswerPresenter {
  // static presenter() {}
  static toHTTP(answer: Answer) {
    // formato da answer que será enviada ao front
    return {
      id: answer.id.toString(),
      content: answer.content, 
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    }
  }
}