// import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should has user password upon registration", async () => {
    // const prismaUsersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHeashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHeashed).toBe(true);
    console.log(user.name);
    // console.log(user.password_hash);
  });
});

// connection prisma
// class register use case
// class execute parameters
// return data
