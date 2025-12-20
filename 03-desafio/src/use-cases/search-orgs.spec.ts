import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchOrgsUseCase } from "./search-orgs";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let sut: SearchOrgsUseCase;

describe("Search Orgs Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    sut = new SearchOrgsUseCase(inMemoryOrgsRepository);
  });

  it("Should be able to search organizations", async () => {
    await inMemoryOrgsRepository.create({
      name: "Org 1",
      email: "org1@example.com",
      password_hash: "123456",
      address: "Rua 1",
      postal_code: "Cidade 1",
      phone: "123456789",
    });

    await inMemoryOrgsRepository.create({
      name: "Org 2",
      email: "org2@example.com",
      password_hash: "123456",
      address: "Rua 2",
      postal_code: "Cidade 2",
      phone: "123456789",
    });

    const name = "Org";
    const {orgs} = await sut.execute({ name });

    expect(orgs).toHaveLength(2);
    expect(orgs).toEqual([
      expect.objectContaining({ name: "Org 1" }),
      expect.objectContaining({ name: "Org 2" }),
    ]);
  });

});
