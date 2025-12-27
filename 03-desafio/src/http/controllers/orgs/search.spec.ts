import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Search Organizations (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search organization", async () => {
    await request(app.server).post("/orgs").send({
      name: "Org 1",
      password: "123456",
      email: "wesley1@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    await request(app.server).post("/orgs").send({
      name: "Org 2",
      password: "123456",
      email: "wesley2@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
    });

    const response = await request(app.server).get("/orgs").send();

    const { orgs } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(orgs).toHaveLength(2);
    expect(orgs).toEqual(
      expect.arrayContaining([

        expect.objectContaining({
          name: "Org 1",
          email: "wesley1@gmail.com",
          address: "embu das artes",
        }),

        expect.objectContaining({
          name: "Org 2",
          email: "wesley2@gmail.com",
          address: "embu das artes",
        }),

      ])
    );

  });
});
