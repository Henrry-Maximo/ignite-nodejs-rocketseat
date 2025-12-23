import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Register Organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready(); // event emitido para avisar que aplicação inicializou
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to register organization", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Amor & Carinho",
      password: "123456",
      email: "wesley@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    expect(response.statusCode).toEqual(201);
  });
});

// test('testing', () => {
//   expect(1 + 1).toEqual(2);
// })
