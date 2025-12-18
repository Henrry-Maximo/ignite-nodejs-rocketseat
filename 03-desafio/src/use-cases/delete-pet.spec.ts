import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, it } from "vitest";
import { DeletePetUseCase } from "./delete-pet";

let petsRepository: InMemoryPetsRepository;
let sut: DeletePetUseCase;

describe("Delete Pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new DeletePetUseCase(petsRepository);
    // system under test
  });

  it.skip("should be able delete pet", async () => {
    // const { id } = await petsRepository.create({
    //   id: "qweqowej123u21983219ieqoprp13u9213211qwr211",
    //   name: "Billy",
    //   description: "É um cachorro macho e peludo.",
    //   status: "unavailable",
    //   age: "young",
    //   size: "small",
    //   power: "low",
    //   independence: "high",
    //   ambience: "medium",
    //   path: "/images/roberto.png",
    //   requisites: ["É necessário ter um salário superior a 500R$"],
    //   org: { connect: { id: org.id } },
    // });
  });
});
