import { Answer } from "../entities/answer.js";

// Com interface
interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    });

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
