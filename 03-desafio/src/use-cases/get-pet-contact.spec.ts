import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetPetContactUseCase } from "./get-pet-contact";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetContactUseCase;

describe("Get Pet Org Contact Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetContactUseCase(petsRepository, orgsRepository);
  });

  it("should be able to get contact of organization though pet", async () => {
    const org = await orgsRepository.create({
      id: "qweqowej123u21983219ieqoprp13u9213211qwr213",
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
      org: { connect: { id: org.id } }
    });

    const { whatsappUrl } = await sut.execute({ id });

    expect(whatsappUrl).toEqual(expect.any(String));
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
