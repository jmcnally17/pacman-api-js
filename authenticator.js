const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class Authenticator {
  static tokenSecret = crypto.randomBytes(64).toString("hex");

  static generateAccessToken(username) {
    return jwt.sign({ username: username }, Authenticator.tokenSecret, {
      expiresIn: "1800s",
    });
  }

  static authenticateToken(req, res, next) {
    const token = req.headers["authorisation"];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, Authenticator.tokenSecret, (err, user) => {
      if (err) {
        res.statusMessage = "Unable to verify token";
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
}

module.exports = Authenticator;
