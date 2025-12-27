import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface SearchOrgsUseCaseRequest {
  name?: string;
}

interface SearchOrgsUseCaseResponse {
  orgs: Omit<Org, "password_hash">[];
}

export class SearchOrgsUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
  }: SearchOrgsUseCaseRequest): Promise<SearchOrgsUseCaseResponse> {
    const responseOrgs = await this.orgRepository.searchMany(name);

    const orgs = responseOrgs.map((org) => {
      const { password_hash, ...orgWithoutPassword } = org;
      
      return orgWithoutPassword;
    });

    return { orgs };
  }
}
