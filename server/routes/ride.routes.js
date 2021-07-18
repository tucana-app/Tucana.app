const controller = require("../controllers").ride;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/ride/get-user-rides", controller.getUserRides);

  app.get("/api/ride/get-all-rides", controller.getAllRides);

  app.post("/api/ride/add-ride", controller.addRide);
};
