import { describe, expect, it, test } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

/*
  Teste unitário: não existe dependência, tudo em memória.
*/

test("check if it works", () => {
  expect(2 + 2).toBe(4);
});

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    // const prismaOrgsRepository = new PrismaOrgsRepository();
    // enviar um objeto que imita prismaOrgsRepository
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
          address: data.address,
          city: data.city,
          postal_code: data.postal_code,
          phone: data.phone,
          created_at: new Date(),
        };
      },
    });

    const { organization } = await registerUseCase.execute({
      name: "Henrique Maximo",
      email: "henrylimadasilva@gmail.com",
      password: "123456",
      address: "Rua dos bobos",
      city: "São Paulo",
      postal_code: "12345678",
      phone: "11999999999",
    });

    console.log(organization.password_hash);
    const isPasswordCorrectlyHashed = await compare(
      "123456",
      organization.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
