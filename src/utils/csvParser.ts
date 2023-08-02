import csv from "csv-parser";
import { Readable } from "stream";
//import fs from "fs";

export const csvParser = async (
  buffer: Buffer
): Promise<Record<"string", any>[]> => {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    Readable.from(buffer)
      .pipe(csv()) // should add validation for csv file
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
