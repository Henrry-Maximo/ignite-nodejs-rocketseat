import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    // const orgsRepository = new InMemoryOrgsRepository();
    // const sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
      name: "Pet Shop Animals",
      email: "XXXXXXXXXXXXXX@gmail.com",
      password_hash: await hash("123456", 6),
      address: "Rua dos bobos",
      postal_code: "12345678",
      phone: "11999999999",
    });

    /*
     * Pattern: nomear a variável principal como sut (system under test)
     */
    const { org } = await sut.execute({
      email: "XXXXXXXXXXXXXX@gmail.com",
      password: "123456",
    });

    await expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "XXXXXXXXXXXXXX@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "Pet Shop Animals",
      email: "XXXXXXXXXXXXXX@gmail.com",
      password_hash: await hash("123456", 6),
      address: "Rua dos bobos",
      postal_code: "12345678",
      phone: "11999999999",
    });

    await expect(() =>
      sut.execute({
        email: "XXXXXXXXXXXXXX@gmail.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
