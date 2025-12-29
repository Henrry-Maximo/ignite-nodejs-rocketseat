import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export const authenticate = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d'
        },
      }
    );

    return reply.setCookie('refreshToken',refreshToken, {
      path: '/', // quais rotas podem ter acesso ao cookie (/ - todo back)
      secure: true, // defini que o cookie será encripitado utilizando o HTTPS (tá usando? / não valor primitivo)
      sameSite: true, // acessado somente pelo mesmo domínio da aplicação
      httpOnly: true, // só poderá ser acessado pelo backend, não fica salvo no cliente
    }).status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
};
