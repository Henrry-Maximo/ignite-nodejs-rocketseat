import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

interface IBody {
  name: string;
  email: string;
  password: string;
}

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { };

  @Post()
  @HttpCode(201)
  async handle(@Body() body: IBody) {
    const { name, email, password } = body;

    // const name = 'Henrique';
    // const email = 'henrrylimadasilva@gmail.com';
    // const password = '123456';

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    });
  }
}