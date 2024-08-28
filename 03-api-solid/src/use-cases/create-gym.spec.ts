import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRespository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRespository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript GYM",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
