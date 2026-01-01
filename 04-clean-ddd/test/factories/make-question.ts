import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override:Partial<QuestionProps> = {}
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: "example-question",
    slug: Slug.create("example-question"),
    content: "example content question",
    ...override // sobrescrever qualquer informação que se tenha passado no makeQuestion
  });

  return question;
}
