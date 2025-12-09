import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'Henrique Maximo',
      email: 'henrylimadasilva@gmail.com',
      password: '123456',
      address: 'Rua dos bobos',
      postal_code: '12345678',
      phone: '11999999999',
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Henrique Maximo',
      email: 'henrylimadasilva@gmail.com',
      password: '123456',
      address: 'Rua dos bobos',
      postal_code: '12345678',
      phone: '11999999999',
    });

    console.log(organization.password_hash);
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'henrylimadasilva@gmail.com';
    await sut.execute({
      name: 'Henrique Maximo',
      email,
      password: '123456',
      address: 'Rua dos bobos',
      postal_code: '12345678',
      phone: '11999999999',
    });

    await expect(() =>
      sut.execute({
        name: 'Henrique Maximo',
        email,
        password: '123456',
        address: 'Rua dos bobos',
        postal_code: '12345678',
        phone: '11999999999',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
