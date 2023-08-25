const redis = require("redis");

const config = process.env.REDIS_HOST
  ? {
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }
  : null;

const redisClient = redis.createClient(config);
redisClient.connect();

process.on("exit", () => {
  redisClient.quit();
});

module.exports = redisClient;
