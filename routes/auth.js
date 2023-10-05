const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");
const Authenticator = require("../authenticator");

router.get("/", Authenticator.authenticateToken, AuthController.Index);
router.post("/", AuthController.Create);

module.exports = router;
