const User = require("../models/user");
const bcrypt = require("bcrypt");
const { Profanity, ProfanityOptions } = require("@2toad/profanity");

const options = new ProfanityOptions();
options.wholeWord = false;
const profanity = new Profanity(options);

const UsersController = {
  Create: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username.includes(" ")) {
      res.status(401).send({ message: "Username cannot contain any spaces" });
    } else if (username.length < 3 || username.length > 15) {
      res
        .status(401)
        .send({ message: "Username must be 3-15 characters long" });
    } else if (profanity.exists(username)) {
      res.status(401).send({ message: "No profanity!" });
    } else if (password.length < 8) {
      res
        .status(401)
        .send({ message: "Password must be at least 8 characters long" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = new User({
          username: username,
          password: hash,
        });
        try {
          await user.save();
          res.status(200).send();
        } catch (err) {
          if (err.code === 11000) {
            res.status(401).send({ message: "Username already taken" });
          } else {
            res.status(400).send({ message: "Oops, something went wrong!" });
          }
        }
      });
    }
  },
};

module.exports = UsersController;
