const confirmSignup = require("./signup");
const forgotPassword = require("./forgotPassword");
const resetPasswordSuccess = require("./resetPasswordSuccess");
const resetPasswordSuccess = require("./reminderRatingToDriver");
const resetPasswordSuccess = require("./reminderRatingToPassenger");

module.exports = {
  confirmSignup,
  forgotPassword,
  resetPasswordSuccess,
  reminderRatingToDriver,
  reminderRatingToPassenger,
};
