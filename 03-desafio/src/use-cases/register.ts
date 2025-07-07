import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { randomInt } from "node:crypto";
import { EmailAlreadyExists } from "./errors/email-already-exists";
import { PrismaOrgsRepository } from "@/repositories/prisma-orgs-repository";

interface registerUseCaseRequest {
  name: string,
  email: string,
  password: string,
  address: string,
  city: string,
  postal_code: string,
  phone: string,
}

export const registerUseCase = async ({
  name,
  email,
  password,
  address,
  city,
  postal_code,
  phone,
}: registerUseCaseRequest) => {
  /*
    findUnique: encontrar item único da tebela
  */
  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  });

  if (orgWithSameEmail) {
    throw new EmailAlreadyExists();
  }

  /*
    randomInt -> gerar um número aleatório entre 6 e 10
    hash -> gerar hash baseado no salt (quanto maior, mais pesado será)
  */
  const randomSalt = randomInt(6, 10);
  const password_hash = await hash(password, randomSalt);

  const prismaOrgsRepository = new PrismaOrgsRepository();

  prismaOrgsRepository.create({
    name,
    email,
    password_hash,
    address,
    city,
    postal_code,
    phone,
  });
};
