const fs = require("fs");

let config = {};
if (fs.existsSync("./env.js")) {
  config = require("./env");
}

class Config {
  static get(variable) {
    return variable in config ? config[variable] : undefined;
  }
}

module.exports = Config;
