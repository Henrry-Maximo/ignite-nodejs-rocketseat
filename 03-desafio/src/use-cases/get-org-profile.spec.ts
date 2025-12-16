import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { GetOrgProfileUseCase } from './get-org-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it('should be able to get user profile', async () => {
    const { id } = await orgsRepository.create({
      name: 'Pet Shop Animals',
      email: 'XXXXXXXXXXXXXX@gmail.com',
      password_hash: await hash('123456', 6),
      address: 'Rua dos bobos',
      postal_code: '12345678',
      phone: '11999999999',
    });

    const { org } = await sut.execute({
      orgId: id,
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.name).toEqual('Pet Shop Animals');
  });

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
