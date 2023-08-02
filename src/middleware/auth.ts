import { getAsync } from "../models/redis";
import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers);
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tokenKey = `auth-token:${token}`;
    const ip = await getAsync(tokenKey);
    console.log(token, ip, tokenKey);
    if (!ip) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
