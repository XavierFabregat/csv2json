import { describe, expect, it } from "@jest/globals";
import { csvParser } from "../utils/csvParser";
import mockResults from "./mocks/MOCK_RESULT.json";

describe("csvParser", () => {
  it("should return an array of objects", async () => {
    const results = await csvParser(__dirname + "/mocks/MOCK_DATA.csv");
    expect(results).toEqual(mockResults);
  });
});
