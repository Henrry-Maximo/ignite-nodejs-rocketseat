import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true }); // Valida o refreshToken armazenado no cookie (não aceita token do header)

  const { role } = req.user; // Manter o cargo do usuário no refresh token

  // Gera um novo access token (curta duração, usado nas requisições)
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub, // dados do usuário (extraído do refreshToken validado)
      },
    },
  );

  // Gera um novo refreshToken (longa duração, 7 dias)
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d",
      },
    },
  );

  // Armazena o novo refreshToken no cookie e retorna o access token
  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
