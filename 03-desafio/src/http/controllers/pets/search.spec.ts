import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search pets", async () => {
    const responseOrg = await request(app.server).post("/orgs").send({
      name: "Org 1",
      password: "123456",
      email: "wesley1@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    const { org } = responseOrg.body;

    const responseAuth = await request(app.server).post("/sessions").send({
      email: "wesley1@gmail.com",
      password: "123456",
    });

    const { token } = responseAuth.body

    await request(app.server)
      .post("/pets").set("Authorization", `Bearer ${token}`)
      .send({
        name: "Billy",
        description: "É um cachorro macho e peludo.",
        status: "available",
        age: "young",
        size: "small",
        power: "low",
        independence: "high",
        ambience: "medium",
        path: "/images/roberto.png",
        requisites: ["É necessário ter um salário superior a 500R$"],
        org: org.id,
      });

    const cityPetsRequired = "embu das artes";
    const response = await request(app.server).get(`/pets?city=${cityPetsRequired}`).send();

    const { pets } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Billy",
          status: "available"
        })
      ])
    );

  });
});
