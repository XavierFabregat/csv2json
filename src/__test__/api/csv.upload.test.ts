import app from "./app";
import mockResponse from "../mocks/MOCK_RESULT.json";
import redis from "../../models/redis";

afterAll(async () => {
  await redis.quit();
});

describe("Test the root path", () => {
  test("It should response the GET method with an html file", async () => {
    const response = await app.get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });

  test("It should not response the POST method", async () => {
    const response = await app.post("/");
    expect(response.status).toBe(404);
  });
});

describe("Test the csv path", () => {
  test("it should return 401 if no auth token is given", async () => {
    const response = await app.post("/csv/upload");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
  test("It should response 400, No file found if no file is give", async () => {
    const auth = await app.get("/auth/token");
    const response = await app
      .post("/csv/upload")
      .set("Authorization", auth.body.token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "No file found" });
  });

  test("should response 200, with the parsed csv file", async () => {
    const auth = await app.get("/auth/token");
    const response = await app
      .post("/csv/upload")
      .set("Authorization", auth.body.token)
      .attach("file", __dirname + "/../mocks/MOCK_DATA.csv");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
