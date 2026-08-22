import { Question } from "@/domain/forum/enterprise/entities/question";

// converter a informação de um formato para outro
export class QuestionPresenter {
  // static presenter() {}
  static toHTTP(question: Question) {
    // formato da question que será enviada ao front
    return {
      id: question.id,
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    }
  }
}