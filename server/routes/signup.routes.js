const controller = require("../controllers").signup;

module.exports = (app) => {
  app.get(
    "/api/signup/check-duplicate-username",
    controller.checkDuplicateUsername
  );

  app.get("/api/signup/check-duplicate-email", controller.checkDuplicateEmail);

  app.get(
    "/api/signup/check-duplicate-phonenumber",
    controller.checkDuplicatePhoneNumber
  );
};
