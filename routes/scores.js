const express = require("express");
const router = express.Router();

const ScoresController = require("../controllers/scores");
const Authenticator = require("../authenticator");

router.get("/", ScoresController.Index);
router.post("/", Authenticator.authenticateToken, ScoresController.Create);

module.exports = router;
