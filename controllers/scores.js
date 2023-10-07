const redisClient = require("../redis");

const ScoresController = {
  Index: async (req, res) => {
    try {
      const scoresData = await redisClient.zRangeWithScores("scores", 0, 9, {
        REV: true,
      });
      const scores = [];
      scoresData.forEach((score) => {
        scores.push({ username: score.value, points: score.score });
      });
      res.json({
        scores: scores,
      });
    } catch {
      res.status(500).send({ message: "scores could not be retrieved" });
    }
  },
  Create: async (req, res) => {
    if (req.user.username !== req.body.username) {
      res.status(403).send({
        message: "User logged in does not match username sent to update score",
      });
    }
    try {
      const currentScore = await redisClient.zScore(
        "scores",
        req.body.username
      );
      if (req.body.points > currentScore || currentScore === null) {
        await redisClient.zAdd("scores", {
          score: req.body.points,
          value: req.body.username,
        });
        res.status(201).send({ message: "your score has been saved" });
      } else {
        res
          .status(204)
          .send({ message: "you have not beaten your high score" });
      }
    } catch {
      res.status(500).send({ message: "your score was not saved" });
    }
  },
};

module.exports = ScoresController;
