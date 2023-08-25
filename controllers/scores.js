const redisClient = require("../redis");

const ScoresController = {
  Index: async (req, res) => {
    try {
      const scoresData = await redisClient.zRangeWithScores("scores", 0, 9, {
        REV: true,
      });
      res.json({
        scores: scoresData,
      });
    } catch {
      res.status(500).send({ message: "scores could not be retrieved" });
    }
  },
  Create: async (req, res) => {
    try {
      const currentScore = await redisClient.zScore("scores", req.body.name);
      if (req.body.points > currentScore || currentScore === null) {
        await redisClient.zAdd("scores", {
          score: req.body.points,
          value: req.body.name,
        });
        res.status(201).send({ message: "your score has been saved" });
      } else {
        res
          .status(201)
          .send({ message: "you have not beaten your high score" });
      }
    } catch {
      res.status(500).send({ message: "your score was not saved" });
    }
  },
};

module.exports = ScoresController;
