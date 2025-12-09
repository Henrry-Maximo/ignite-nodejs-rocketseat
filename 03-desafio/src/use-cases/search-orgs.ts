import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface SearchOrgsUseCaseRequest {
  name?: string
}

interface SearchOrgsUseCaseResponse {
  orgs: Org[]
}

export class SearchOrgsUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({ name }: SearchOrgsUseCaseRequest): Promise<SearchOrgsUseCaseResponse> {
    const orgs = await this.orgRepository.searchMany(name);

    return { orgs };
  }
}