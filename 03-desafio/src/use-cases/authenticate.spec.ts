import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
      name: "Pet Shop Animals",
      email: "XXXXXXXXXXXXXX@gmail.com",
      password_hash: await hash("123456", 6),
      address: "Rua dos bobos",
      city: "São Paulo",
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

    expect(org.id).toEqual(expect.any(String));
  });
});
