import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeletePetUseCase } from "./delete-pet";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: DeletePetUseCase;

describe("Delete Pets Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new DeletePetUseCase(petsRepository);
    // system under test
  });

  it("should be able delete pet", async () => {
    const org = await orgsRepository.create({
      name: "Pet Shop Animals",
      email: "XXXXXXXXXXXXXX@gmail.com",
      password_hash: await hash("123456", 6),
      address: "Rua dos bobos",
      postal_code: "12345678",
      phone: "11999999999",
    });

    const { id } = await petsRepository.create({
      id: "qweqowej123u21983219ieqoprp13u9213211qwr211",
      name: "Billy",
      description: "É um cachorro macho e peludo.",
      status: "unavailable",
      age: "young",
      size: "small",
      power: "low",
      independence: "high",
      ambience: "medium",
      path: "/images/roberto.png",
      requisites: ["É necessário ter um salário superior a 500R$"],
      org: { connect: { id: org.id } },
    });

    expect(await sut.execute({ id }));

    const pet = await petsRepository.findById(id);

    expect(pet).toBeNull();
  });
  
  it("Should not be able delete pet that not exists", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
});
