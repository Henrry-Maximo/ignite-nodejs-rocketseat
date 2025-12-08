import { hash } from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';
import { OrgsRepository } from '@/repositories/orgs-repository';
import { Org } from '@prisma/client';

interface RegisterOrgsUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  postal_code: string;
  address: string;
}

interface RegisterOrgsUseCaseResponse {
  org: Org;
}
export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({
    name,
    email,
    password,
    address,
    postal_code,
    phone,
  }: RegisterOrgsUseCaseRequest): Promise<RegisterOrgsUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const randomSalt = randomInt(6, 10);
    const password_hash = await hash(password, randomSalt);

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      postal_code,
      phone,
    });

    return { org };
  }
}
