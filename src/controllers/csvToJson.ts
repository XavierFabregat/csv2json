import { csvParser } from "../utils/csvParser";
import { Request, Response } from "express";

export const csvToJson = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    if (!file) {
      throw new Error("No file found");
    }
    const results = await csvParser(file.buffer);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
