import redis from "../models/redis";
import { promisify } from "util";
import { Request, Response, NextFunction } from "express";
import { Callback, RedisKey } from "ioredis";

const getAsync: (
  key: RedisKey,
  callback?: Callback<string | null>
) => Promise<string | null> = promisify(redis.get).bind(redis);
const setAsync: (
  key: RedisKey,
  value: string | number | Buffer
) => Promise<string | null> = promisify(redis.set).bind(redis);
// const delAsync: (
//   key: RedisKey,
//   callback?: Callback<string | null>
// ) => Promise<string | null> = promisify(redis.del).bind(redis);

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const { ip } = req;
  const rateLimitKey = `rate-limit:${ip}`;
  const currentTimestamp = Date.now();

  try {
    const rateLimitData = await getAsync(rateLimitKey);
    if (rateLimitData) {
      const { timestamp, count } = JSON.parse(rateLimitData);

      const timeElapsed = currentTimestamp - timestamp;
      if (timeElapsed < 60000) {
        // 1 minute
        if (count >= 10) {
          return res.status(429).json({ message: "Too many requests" });
        } // 10 requests per minute
        await setAsync(
          rateLimitKey,
          JSON.stringify({ timestamp: currentTimestamp, count: count + 1 })
        );
      } else {
        // reset count
        await setAsync(
          rateLimitKey,
          JSON.stringify({ timestamp: currentTimestamp, count: 1 })
        );
      }
    } else {
      // no rate limit data, so it is the first request
      await setAsync(
        rateLimitKey,
        JSON.stringify({ timestamp: currentTimestamp, count: 1 })
      );
    }
    next();
    return;
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter;
