import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    };

    return PrismaQuestionMapper.toDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug
      },
    });

    if (!question) {
      return null;
    };

    return PrismaQuestionMapper.toDomain(question);
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findManyRecent({
      orderBy: {
        createdAt: 'desc', // mais recentes primeiro
      },
      take: 20,
      skip: (page - 1) * 20
    });

    // versão 1
    // return questions.map(question => {
    //   return PrismaQuestionMapper.toDomain(question);
    // });

    // versão 2
    return questions.map(PrismaQuestionMapper.toDomain);
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.create({
      data,
      // opção 1 (quebrando o mapper)
      // data: {
      //   title: question.title,
      //   slug: question.slug.value
      // }
    });
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.update({
      where: {
        id: data.id
      },
      data
    });
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id
      },
    });

  }
}