import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import z from "zod";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/use-cases/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// // is possible infer typing typescript, without necessary write
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

// interface IBody {
//   name: string;
//   email: string;
//   password: string;
// }

@Controller("/sessions")
@Public() // habilitar autenticação na rota
export class AuthenticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase,
    // private prisma: PrismaService,
    // private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      // armazenar o erro que ocorreu
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          // resposta com status code 401 (credênciais inválidas)
          throw new UnauthorizedException(error.message);
        default:
          // um erro padrão (400 - erro esperado)
          throw new BadRequestException(error.message);
      }

      // se for erro 500, o próprio nestjs vai retornar erro 500 (sem tratativa)
    }

    const { accessToken } = result.value;

    // underscore
    return {
      access_token: accessToken,
    };
  }
}

/* 

const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User crentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User crentials do not match')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

*/
