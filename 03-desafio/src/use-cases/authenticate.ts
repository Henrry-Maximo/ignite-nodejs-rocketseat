import { OrgsRepository } from '@/repositories/orgs-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { Org } from '@prisma/client';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    // Boolean => "is", "has", "does"
    const doesPassowordMatches = await compare(password, org.password_hash);

    if (!doesPassowordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
