// test("1 plus 1", () => {
//   expect(1 + 1).toBe(2);
// })

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication
  // let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    // subir a aplicação de forma programática
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    // prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    // const user = await prisma.user.create({
    //   data: {
    //     name: 'John Doe',
    //     email: 'johndoe@example.com',
    //     password: '123456',
    //   },
    // })

     const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    await Promise.all([
      questionFactory.makePrismaQuestion({ authorId: user.id, title: 'Question 01' }),
      questionFactory.makePrismaQuestion({ authorId: user.id, title: 'Question 02' }),
    ]);

    // await prisma.question.createMany({
    //   data: [
    //     {
    //       title: 'Question 01',
    //       slug: 'question-01',
    //       content: 'Question content',
    //       authorId: user.id,
    //     },
    //     {
    //       title: 'Question 02',
    //       slug: 'question-02',
    //       content: 'Question content',
    //       authorId: user.id,
    //     },
    //   ],
    // })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: expect.arrayContaining([
        expect.objectContaining({
          title: 'Question 01',
        }),
        expect.objectContaining({
          title: 'Question 02',
        }),
      ]),
    })
  })
})
