import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";


// Com interface
interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}

// new AnswerQuestionUseCase().execute({
//   instructorId: "1",
//   questionId: "2"
// });

/*
Sem interface
class AnswerQuestionUseCase {
  execute(instructorId: string, questionId: string) {
    
  }
}

Não é possível identificar o que está passando
new AnswerQuestionUseCase().execute("1", "2");
*/
