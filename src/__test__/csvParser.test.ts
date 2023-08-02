import { describe, expect, it } from "@jest/globals";
import { csvParser } from "../utils/csvParser";
import mockResults from "./mocks/MOCK_RESULT.json";
import fs from "fs";

describe("csvParser", () => {
  it("should parse a valid CSV file", async () => {
    const buffer = Buffer.from(
      fs.readFileSync(__dirname + "/mocks/MOCK_DATA.csv")
    );
    const results = await csvParser(buffer);
    expect(results).toEqual(mockResults);
  });

  it("should throw an error if the CSV file is invalid", async () => {
    const buffer = Buffer.from(
      fs.readFileSync(__dirname + "/mocks/INVALID_FILE.csv")
    );
    try {
      await csvParser(buffer); //should fail
    } catch (error) {
      console.log(error);
      expect(error.message).toEqual("Invalid csv file");
    }
  });
});
