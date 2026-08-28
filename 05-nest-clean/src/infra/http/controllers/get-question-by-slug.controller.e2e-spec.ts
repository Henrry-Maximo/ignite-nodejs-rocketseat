import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Get question by slug (E2E)", () => {
  let app: INestApplication;
  // let prisma: PrismaService;
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [StudentFactory, QuestionFactory, DatabaseModule]
    }).compile();

    app = moduleRef.createNestApplication();

    // injeção da dependência
    // prisma = moduleRef.get(PrismaService);
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[GET] /questions/:slug", async () => {
    // const user = await prisma.user.create({
    //   data: {
    //     name: "John Doe",
    //     email: "johndoe@example.com",
    //     password: "123456",
    //   },
    // });

    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    // utilizando o mapper para converter os dados da camada de domínio para de persistência
    // const question = makeQuestion();
    // await prisma.question.create({
    //   data: {
    //     title: "Question 01",
    //     slug: "question-01",
    //     content: "Question content",
    //     authorId: user.id.toString(),
    //   },
    //   // data: PrismaQuestionMapper.toPrisma(question)
    // });

    await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'Question-01',
      slug: Slug.create('question-01'),
    });

    const response = await request(app.getHttpServer())
      .get("/questions/question-01")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      question: expect.objectContaining({
        title: "Question 01",
      }),
    });
  });
});
