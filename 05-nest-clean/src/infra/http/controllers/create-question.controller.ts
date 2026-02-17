import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { type UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import z from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createQuestionBodySchema)) // not more necessary use
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: []
    })

    // const slug = this.convertToSlug(title)

    // await this.prisma.question.create({
    //   data: {
    //     authorId: userId,
    //     title,
    //     content,
    //     slug,
    //   },
    // })
  }

  // private convertToSlug(title: string): string {
  //   return title
  //     .normalize('NFKD')
  //     .toLocaleLowerCase()
  //     .trim()
  //     .replace(/\s+/g, '-') // Substitui espaços por hífen
  //     .replace(/[^\w-]+/g, '') // Remove tudo que não é palavra ou hífen
  //     .replace(/_/g, '-') // Substitui sublinhado por hífen
  //     .replace(/--+/g, '-') // Substitui múltiplos hífen por um
  //     .replace(/^-|-$/g, '') // Remove hífen do início ou fim
  // }
}

// @Post()
// async handle(@Req() request: Request) {
//   console.log(request.user);

//   return 'ok';
// }
