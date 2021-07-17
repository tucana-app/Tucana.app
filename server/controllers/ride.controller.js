const db = require("../models");
const Rides = db.Rides;
const RideStatus = db.RideStatus;

module.exports = {
  getRides(req, res) {
    Rides.findAll({
      where: {
        driverId: req.query.userId,
      },
      attributes: {
        exclude: ["RideStatusId"],
      },
      include: [
        {
          model: RideStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(error);
      });
  },

  addRide(req, res) {
    Rides.create({
      driverId: req.body.userId,
      cityOrigin: req.body.formValues.cityOrigin,
      provinceOrigin: req.body.formValues.provinceOrigin,
      cityDestination: req.body.formValues.cityDestination,
      provinceDestination: req.body.formValues.provinceDestination,
      dateTime: req.body.formValues.dateTime,
      seatsAvailable: req.body.formValues.seatsAvailable,
      comment: req.body.formValues.comment,
    })
      .then(res.status(200).send("Success"))
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
      });
  },
};
