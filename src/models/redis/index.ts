import Redis from "ioredis";
import { promisify } from "util";
import { Callback, RedisKey } from "ioredis";

const redis = new Redis({});

export const getAsync: (
  key: RedisKey,
  callback?: Callback<string | null>
) => Promise<string | null> = promisify(redis.get).bind(redis);
export const setAsync: (
  key: RedisKey,
  value: string | number | Buffer
) => Promise<string | null> = promisify(redis.set).bind(redis);
export const delAsync: (
  key: RedisKey,
  callback?: Callback<string | null>
) => Promise<string | null> = promisify(redis.del).bind(redis);

export default redis;
