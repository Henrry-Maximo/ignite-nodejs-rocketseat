import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRespository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to authenticate", async () => {
    // const { user } = await sut.execute({
    // });
    // expect(user.id).toEqual(expect.any(String));
  });
});
