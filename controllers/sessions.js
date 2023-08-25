const User = require("../models/user");
const bcrypt = require("bcrypt");
const Authenticator = require("../authenticator");

const SessionsController = {
  Index: (req, res) => {
    res.send({ user: req.user });
  },
  Create: (req, res) => {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        res.statusMessage = "Invalid credentials";
        res.status(409).send();
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = Authenticator.generateAccessToken(user.username);
            res.json(token);
            res.status(200).send();
          } else {
            res.statusMessage = "Invalid credentials";
            res.status(409).send();
          }
        });
      }
    });
  },
};

module.exports = SessionsController;
