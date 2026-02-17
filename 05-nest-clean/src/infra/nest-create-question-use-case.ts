import { type QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateQuestionUseCase extends CreateQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository);
  }
}

/* 

Opção 1: Adicionando um código de um framework dentro da parte de domínio da aplicação (fere a regra de desacoplamento da clean archtecture)
@Injectable()  

Obs.: não prejudica o comportamento da classe

Opção 2: Criar uma repsentação do caso de uso dentro da camada de infra. Por exemplo, "nest-create-question-use-case", e será uma classe que extende a CreateQuestionUseCase, não tendo qualquer tipo de implementação, apenas um constructor. Aplicando no constructor a dependência em questão, que refere-se ao uso do use-case. Utilizando o método super para sobreescrever com a dependência.

Obs.: não precisa seguir a risca.

*/