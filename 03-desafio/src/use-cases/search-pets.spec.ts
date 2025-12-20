import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(inMemoryPetsRepository);
  });

  it("Should be able to search pets", async () => {
    const org = await inMemoryOrgsRepository.create({
      name: "Henrique Maximo",
      password_hash: "123456",
      email: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      postal_code: "06807-100",
      address: "Rua dos bobos",
      phone: "11999999999",
    });

    const pet = await inMemoryPetsRepository.create({
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
      org: {
        connect: {
          id: org.id,
        },
      },
    });

    await inMemoryPetsRepository.create({
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
      org: {
        connect: {
          id: org.id,
        },
      },
    });

    const data = {
      id: pet.id,
      name: pet.name,
      city: "São Paulo",
      status: pet.status,
      age: pet.age,
      size: pet.size,
      power: pet.power,
      independence: pet.independence,
      ambience: pet.ambience
    };
    const { pets } = await sut.execute(data);

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Rex" }),
      expect.objectContaining({ name: "Rex" }),
    ]);
  });
});
