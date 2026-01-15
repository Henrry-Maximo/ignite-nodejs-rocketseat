import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

/* 
  * Upload de arquivos: *
  * Nas aplicações modernas, normalmente, é evitado realizar o upload dos anexos no mesmo momento que é realizado o cadastro da entidade principal.
  * Exemplo: no momento em que um usuário estiver criando um tópico e tiver vários anexos. 
  * Recomendado: assim que o usuário escolher o anexos, realizar previamente a ação e obter os IDs para uso posterior, assim não recebemos o arquivo, mas sim, a referência.
  * Cadastro de formato "multipart/form-data": único formato que permite enviar arquivos do frontend para o backend. No entanto, sua estrutura de dados não é JSON, ou seja, para obter os dados é complicado.
  * Solução: utilizar duas rotas, uma para criação do tópico (question) e outro para criar os anexos (no formato multipart/form-data).
  * create question -> JSON -> attachments (enviando apenas os IDs dos anexos)
*/

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null, 
  { 
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      });
    });

    question.attachments = questionAttachments;

    // salvar question no repositório
    await this.questionsRepository.create(question)

    return right({
      question,
    });
  }
}