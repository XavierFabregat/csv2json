import csv from "csv-parser";
import fs from "fs";

export const csvParser = async (
  file: any
): Promise<Record<"string", any>[]> => {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    const r = fs.createReadStream(file);
    r.pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
