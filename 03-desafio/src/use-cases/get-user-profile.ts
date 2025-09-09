import { OrgsRepository } from '@/repositories/orgs-repository';
import { Org } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  orgId: string;
}

// return void
// type GetUserProfileUseCaseResponse = void;
interface GetUserProfileUseCaseResponse {
  org: Org;
}

export class GetUserProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository;
  }

  async execute({
    orgId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return {
      org,
    };
  }
}
