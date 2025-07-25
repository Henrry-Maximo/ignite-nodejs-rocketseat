import { hash } from "bcryptjs";
import { randomInt } from "node:crypto";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
}

interface RegisterUseCaseResponse {
  organization: Org;
}

/*
  Aplicação: D - Dependency Inversion Principle
*/

export class RegisterUseCase {
  // private orgsRepository: any;

  // private, public, protected

  constructor(private orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({
    name,
    email,
    password,
    address,
    city,
    postal_code,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    /*
    findUnique: encontrar item único da tebela
  */
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    /*
    randomInt -> gerar um número aleatório entre 6 e 10
    hash -> gerar hash baseado no salt (quanto maior, mais pesado será)
  */
    const randomSalt = randomInt(6, 10);
    const password_hash = await hash(password, randomSalt);

    // const prismaOrgsRepository = new PrismaOrgsRepository();

    const organization = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      city,
      postal_code,
      phone,
    });

    // estrutura de retorno
    return { organization };
  }
}

// export const registerUseCase = async ({
//   name,
//   email,
//   password,
//   address,
//   city,
//   postal_code,
//   phone,
// }: registerUseCaseRequest) => {
//   /*
//     findUnique: encontrar item único da tebela
//   */
//   const orgWithSameEmail = await prisma.org.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (orgWithSameEmail) {
//     throw new EmailAlreadyExists();
//   }

//   /*
//     randomInt -> gerar um número aleatório entre 6 e 10
//     hash -> gerar hash baseado no salt (quanto maior, mais pesado será)
//   */
//   const randomSalt = randomInt(6, 10);
//   const password_hash = await hash(password, randomSalt);

//   const prismaOrgsRepository = new PrismaOrgsRepository();

//   await prismaOrgsRepository.create({
//     name,
//     email,
//     password_hash,
//     address,
//     city,
//     postal_code,
//     phone,
//   });
// };
