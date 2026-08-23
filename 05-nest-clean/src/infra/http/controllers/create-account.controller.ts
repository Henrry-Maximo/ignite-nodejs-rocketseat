import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

import { z } from "zod";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { StudentAlreadyExistsError } from "@/domain/forum/application/use-cases/errors/student-already-exists-error";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// is possible infer typing typescript, without necessary write
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

// interface IBody {
//   name: string;
//   email: string;
//   password: string;
// }

@Controller("/accounts")
export class CreateAccountController {
  constructor(
    private registerStudent: RegisterStudentUseCase,
    // private prisma: PrismaService
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // not more necessary use parse, its is validation
  async handle(@Body() body: CreateAccountBodySchema) {
    // const { name, email, password } = createAccountBodySchema.parse(body);
    const { name, email, password } = body;

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          // status code 409 (conflito)
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}

/*

const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 8)

    // const name = 'Henrique';
    // const email = 'henrrylimadasilva@gmail.com';
    // const password = '123456';

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

*/
