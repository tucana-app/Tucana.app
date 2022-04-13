const auth = require("./auth.controller");
const admin = require("./admin.controller");
const ride = require("./ride.controller");
const email = require("./email.controller");
const message = require("./message.controller");
const rating = require("./rating.controller");

module.exports = {
  auth,
  admin,
  ride,
  email,
  message,
  rating,
};
