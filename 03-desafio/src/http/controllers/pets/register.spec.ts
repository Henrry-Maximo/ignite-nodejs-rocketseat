import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import request from "supertest";

describe("Register Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to register pets", async () => {
    const responseOrg = await request(app.server).post("/orgs").send({
      name: "Amor & Carinho",
      password: "123456",
      email: "wesley@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    const { org } = responseOrg.body;

    const responseAuth = await request(app.server).post("/sessions").send({
      email: "wesley@gmail.com",
      password: "123456",
    });

    const { token } = responseAuth.body;

    const response = await request(app.server)
      .post("/pets").set("Authorization", `Bearer ${token}`)
      .send({
        name: "Billy",
        description: "É um cachorro macho e peludo.",
        status: "unavailable",
        age: "young",
        size: "small",
        power: "low",
        independence: "high",
        ambience: "medium",
        path: "/images/roberto.png",
        requisites: ["É necessário ter um salário superior a 500R$"],
        org: org.id,
      });

    const { pet } = response.body;

    expect(response.statusCode).toEqual(201);
    expect(pet).toEqual(expect.objectContaining({
      name: "Billy",
      status: "unavailable",
      age: "young"
    }));
  });
});
