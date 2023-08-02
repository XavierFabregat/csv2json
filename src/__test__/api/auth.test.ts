import app from "./app";
import redis from "../../models/redis";

afterAll(async () => {
  await redis.quit();
});

describe("Auth", () => {
  test("it should return a token", async () => {
    const response = await app.get("/auth/token");
    expect(response.body).toHaveProperty("token");
  });

  test("it should return 300 if that ip already has a token", async () => {
    const response = await app.get("/auth/token");
    expect(response.status).toBe(300);
    expect(response.body).toHaveProperty("token");
  });

  test("it should delete the token", async () => {
    const response = await app.get("/auth/token");
    const token = response.body.token;
    const delResponse = await app.delete(`/auth/token/${token}`);
    expect(delResponse.status).toBe(200);
    expect(delResponse.body).toHaveProperty("message");
  });
});
