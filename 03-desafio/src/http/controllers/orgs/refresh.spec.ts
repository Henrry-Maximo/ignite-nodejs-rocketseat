import { afterAll, beforeAll, describe, expect, it } from "vitest";

import request from "supertest";
import { app } from "@/app";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  })

  it("Should be able to refresh a token", async () => {
    await request(app.server).post("/orgs").send({
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

    const cookies = responseAuth.get('Set-Cookie') ?? [];

    const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
