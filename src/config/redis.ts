import dotenv from 'dotenv';
import { Redis } from 'ioredis';

dotenv.config();
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

export default redis;
