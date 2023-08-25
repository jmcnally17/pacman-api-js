const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");
const Authenticator = require("../authenticator");

router.get("/", Authenticator.authenticateToken, SessionsController.Index);
router.post("/", SessionsController.Create);

module.exports = router;
