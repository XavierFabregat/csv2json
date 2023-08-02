import Redis from "ioredis";
import { promisify } from "util";
import { Callback, RedisKey } from "ioredis";
import { __prod__ } from "../../constants";
const { REDIS_URL } = process.env;

const redis = new Redis(__prod__ ? REDIS_URL! : "", { family: 6 });

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
