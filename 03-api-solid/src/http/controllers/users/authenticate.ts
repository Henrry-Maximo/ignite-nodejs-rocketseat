import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
// import { AuthenticateUseCase } from "@/use-cases/authenticate";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.coerce.string().email(),
    password: z.string().min(3),
  });

  const { password, email } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      // bad request
      return reply.status(400).send({ message: err.message });
    }

    throw err;
    // return reply.status(500).send(); // TODO: fix me
  }
}
