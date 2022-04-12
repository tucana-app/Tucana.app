const { verifySignUp } = require("../middleware");
const controller = require("../controllers").auth;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicate],
    controller.signup
  );

  app.put("/api/auth/confirm", controller.confirmEmail);

  app.post("/api/auth/signin", controller.signin);

  app.get(
    "/api/auth/send-email-forgot-password",
    controller.sendForgotPasswordEmail
  );

  app.get(
    "/api/auth/check-deprecated-link-reset-password",
    controller.checkDeprecatedLinkResetPassword
  );

  app.put("/api/auth/reset-password", controller.resetPassword);

  app.post(
    "/api/auth/resend-confirmation-link",
    controller.resendConfirmationLink
  );
};
