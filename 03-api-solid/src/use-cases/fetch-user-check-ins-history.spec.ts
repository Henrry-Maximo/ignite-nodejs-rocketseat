import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRespository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to cetch check-in history", async () => {
    await checkInsRepository.create({ gym_id: "gym-01", user_id: "user-01" });
    await checkInsRepository.create({ gym_id: "gym-02", user_id: "user-01" });

    const { checkIns } = await sut.execute({
      userId: "user-01",
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
});