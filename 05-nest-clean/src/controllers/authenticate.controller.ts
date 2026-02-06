import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import z from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
});

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
    private prisma: PrismaService,
    private jwt: JwtService
  ) { };

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new UnauthorizedException("User crentials do not match");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User crentials do not match");
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    // underscore
    return {
      access_token: accessToken
    };
  }
}