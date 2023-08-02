import requrest from "supertest";
import app from "../../app";
import mockResponse from "../mocks/MOCK_RESULT.json";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await requrest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World!");
  });

  test("It should not response the POST method", async () => {
    const response = await requrest(app).post("/");
    expect(response.status).toBe(404);
  });
});

describe("Test the csv path", () => {
  test("It should response 400, No file found if no file is give", async () => {
    const response = await requrest(app).post("/csv/upload");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "No file found" });
  });

  test("should response 200, with the parsed csv file", async () => {
    const response = await requrest(app)
      .post("/csv/upload")
      .attach("file", __dirname + "/../mocks/MOCK_DATA.csv");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
