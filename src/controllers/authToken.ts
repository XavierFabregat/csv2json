import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { delAsync, setAsync, getAsync } from "../models/redis";

export const getToken = async (req: Request, res: Response) => {
  try {
    const { ip } = req;
    const token = uuidv4();
    const doTheyHaveAToken = await getAsync(`ip-token:${ip}`);
    if (doTheyHaveAToken) {
      return res.status(300).send({
        message:
          "You already have a token, delete it before asking for a new one.",
        token: doTheyHaveAToken,
      });
    }
    const ipToken = `ip-token:${ip}`;
    const tokenKey = `auth-token:${token}`;
    await setAsync(tokenKey, ip);
    await setAsync(ipToken, token);
    return res.status(200).json({ message: "Token generated", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const delToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { ip } = req;
    const tokenKey = `auth-token:${token}`;
    const ipToken = `ip-token:${ip}`;
    if (!(await getAsync(tokenKey))) {
      return res
        .status(404)
        .json({ message: "Token not found, please make a token." });
    }
    await delAsync(tokenKey);
    await delAsync(ipToken);
    return res.status(200).json({ message: "Token deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
