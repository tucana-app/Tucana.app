require("dotenv").config();
require("dotenv").config({ path: "../.env" });

module.exports = {
  secret: process.env.PASS_PHRASE,
};
