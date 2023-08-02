import { getAsync, setAsync } from "../models/redis";
import { Request, Response, NextFunction } from "express";

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
