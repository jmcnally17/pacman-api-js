const redis = require("redis");
const Config = require("./config");

const config = Config.get("REDIS_HOST")
  ? {
      password: Config.get("REDIS_PASSWORD"),
      socket: {
        host: Config.get("REDIS_HOST"),
        port: Config.get("REDIS_PORT,"),
      },
    }
  : null;

const redisClient = redis.createClient(config);
redisClient.connect();

process.on("exit", () => {
  redisClient.quit();
});

module.exports = redisClient;
