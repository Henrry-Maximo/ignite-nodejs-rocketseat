import {
  Body,
  Controller,
  Post, UsePipes
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import z from 'zod'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// // is possible infer typing typescript, without necessary write
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

// interface IBody {
//   name: string;
//   email: string;
//   password: string;
// }

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase
    // private prisma: PrismaService,
    // private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password
    });

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value;

    // underscore
    return {
      access_token: accessToken,
    }
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
