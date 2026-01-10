import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/questions-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = []; // lista de perguntas

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }
}