import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Profile Organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready(); // event emitido para avisar que aplicação inicializou
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get user profile", async () => {
    await request(app.server).post("/orgs").send({
      name: "Amor & Carinho",
      password: "123456",
      email: "wesley@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "wesley@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const orgProfile = await request(app.server)
      .post("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(orgProfile.statusCode).toEqual(201);
    expect(orgProfile.body.org).toEqual(
      expect.objectContaining({ email: "wesley@gmail.com" }),
    );
  });
});

// test('testing', () => {
//   expect(1 + 1).toEqual(2);
// })
