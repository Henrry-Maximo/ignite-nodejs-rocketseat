import { afterAll, beforeAll, describe, expect, it } from "vitest";

import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Delete Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to delete pets", async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true);

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
        org: id,
      });

    const { pet } = responsePet.body;

    const response = await request(app.server)
      .delete(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
