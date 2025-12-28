import { afterAll, beforeAll, describe, expect, it } from "vitest";

import request from "supertest";
import { app } from "@/app";

describe("Delete Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to delete pets", async () => {
    const responseOrg = await request(app.server).post("/orgs").send({
      name: "Amor & Carinho",
      password: "123456",
      email: "wesley@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    const responseAuth = await request(app.server).post("/sessions").send({
      email: "wesley@gmail.com",
      password: "123456",
    });

    const { org } = responseOrg.body;
    const { token } = responseAuth.body;

    const responsePet = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
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

    const { pet } = responsePet.body;

    const response = await request(app.server)
      .delete(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
