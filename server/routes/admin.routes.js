const controller = require("../controllers").admin;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/list-users", controller.adminListUsers);

  app.get("/api/admin/list-rides", controller.adminListRides);

  app.get("/api/admin/single-ride", controller.adminSingleRide);

  app.get(
    "/api/admin/single-ride-all-bookings",
    controller.adminSingleRideAllBookings
  );

  app.get("/api/admin/send-test-email", controller.adminSendTestEmail);

  app.get("/api/admin/get-passengers-ratings", controller.getPassengersRatings);

  app.get("/api/admin/get-drivers-ratings", controller.getDriversRatings);
};
