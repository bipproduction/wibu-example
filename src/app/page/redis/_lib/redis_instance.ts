import Redis from "ioredis";

let redisInstance: Redis | null = null;

const getRedisInstance = (): Redis => {
  if (!redisInstance) {
    redisInstance = new Redis();
  }
  return redisInstance;
};

export default getRedisInstance;
