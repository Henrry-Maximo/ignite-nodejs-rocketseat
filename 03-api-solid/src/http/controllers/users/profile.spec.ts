import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

interface PropsRegister {
  name: string;
  email: string;
  password: string;
}

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server)
      .post("/users")
      .send(<PropsRegister>{
        name: "Johh Doe",
        email: "johndoe@example.com",
        password: "@123456",
      });

    const authResponse = await request(app.server)
      .post("/sessions")
      .send(<PropsRegister>{
        email: "johndoe@example.com",
        password: "@123456",
      });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: "johndoe@example.com" }),
    );
  });
});
