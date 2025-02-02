// lib/redis.js
import { createClient } from 'redis';


// Create a Redis client
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // Redis server URL
});

// Connect to Redis
redis.connect().catch(console.error);

// Log errors
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;