const db = require("../models");
const Rides = db.Rides;
const RideStatus = db.RideStatus;
const User = db.User;
const UsersRides = db.users_rides;

const Op = db.Sequelize.Op;

module.exports = {
  getUserRides(req, res) {
    return UsersRides.findAll({
      where: {
        UserId: req.query.userId,
      },
      attributes: {
        exclude: ["UserId", "RideId"],
      },
      include: [
        {
          model: Rides,
          attributes: {
            exclude: ["RideStatusId"],
          },
          include: {
            model: RideStatus,
          },
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

    // Rides.findAll({
    //   where: {
    //     driverId: req.query.userId,
    //   },
    //   attributes: {
    //     exclude: ["RideStatusId"],
    //   },
    //   include: [
    //     {
    //       model: RideStatus,
    //     },
    //   ],
    // })
    //   .then((response) => {
    //     // console.log(response);
    //     res.status(200).json(response);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     res.status(400).json(error);
    //   });
  },

  addRide(req, res) {
    return Rides.create({
      cityOrigin: req.body.formValues.cityOrigin,
      provinceOrigin: req.body.formValues.provinceOrigin,
      cityDestination: req.body.formValues.cityDestination,
      provinceDestination: req.body.formValues.provinceDestination,
      dateTime: req.body.formValues.dateTime,
      seatsAvailable: req.body.formValues.seatsAvailable,
      seatsLeft: req.body.formValues.seatsAvailable,
      comment: req.body.formValues.comment,
    })
      .then((response) => {
        UsersRides.create(
          {
            UserId: req.body.userId,
            RideId: response.id,
          },
          { fields: ["UserId", "RideId"] }
        )
          .then((response) => {
            // console.log(response);
            res.status(201).send(response);
          })
          .catch((error) => {
            // console.log(error);
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send(error);
      });
  },

  getAllRides(req, res) {
    Rides.findAll({
      where: {
        seatsLeft: {
          [Op.gt]: 0,
        },
        dateTime: {
          [Op.gt]: new Date(),
        },
      },
      order: [["dateTime", "ASC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "email",
              "biography",
              "password",
              "phoneNumber",
              "createdAt",
              "updatedAt",
            ],
          },
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
};
