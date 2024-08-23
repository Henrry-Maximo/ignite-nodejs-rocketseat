import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRespository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepository: InMemoryUsersRespository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should has user password up on registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHeashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHeashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    // Resolve / Reject => Await Promise
    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

// connection prisma
// class register use case
// class execute parameters
// return data
