import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetsUseCase } from "./register-pets";
import { OrganizationNotExists } from "./errors/organization-not-exists";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: RegisterPetsUseCase;

describe("Register Pets Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterPetsUseCase(
      inMemoryPetsRepository,
      inMemoryOrgsRepository
    );
  });

  it("should be able to register pets", async () => {
    const org = await inMemoryOrgsRepository.create({
      name: "Henrique Maximo",
      password_hash: "123456",
      email: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      postal_code: "06807-100",
      address: "Rua dos bobos",
      phone: "11999999999",
    });

    const { pet } = await sut.execute({
      name: "Rex",
      description: "Rex is a dog",
      status: "available",
      age: "puppy",
      size: "small",
      power: "low",
      independence: "low",
      ambience: "small",
      path: "XXXXXXXXXXXXXXXXXXXXXX",
      requisites: ["Rex is a dog"],
      org: org.id,
    });

    expect(pet.name).toBe("Rex");
    expect(pet.org_id).toBe(org.id);
  });

  it("should not be able register pets without organization", async () => {
    await expect(() =>
      sut.execute({
        name: "Rex",
        description: "Rex is a dog",
        status: "available",
        age: "puppy",
        size: "small",
        power: "low",
        independence: "low",
        ambience: "small",
        path: "XXXXXXXXXXXXXXXXXXXXXX",
        requisites: ["Rex is a dog"],
        org: "non-organization-id",
      })
    ).rejects.toBeInstanceOf(OrganizationNotExists);
  });
});
