const controller = require("../controllers").ride;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/ride/user-rides", controller.getUserRides);

  app.get("/api/ride/all-rides", controller.getAllRides);

  app.post("/api/ride/add-ride", controller.addRide);

  app.post("/api/ride/book", controller.bookRide);

  app.get("/api/ride/user-booking-ride", controller.getUserBookingRide);

  app.get(
    "/api/ride/user-new-rides-requests",
    controller.getUserNewRidesRequests
  );
};
