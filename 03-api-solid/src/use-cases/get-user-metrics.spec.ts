import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCaseUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRespository;
let sut: GetUserMetricsUseCaseUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new GetUserMetricsUseCaseUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({ gym_id: "gym-01", user_id: "user-01" });
    await checkInsRepository.create({ gym_id: "gym-02", user_id: "user-01" });
    await checkInsRepository.create({ gym_id: "gym-02", user_id: "user-01" });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(3);
  });
});
