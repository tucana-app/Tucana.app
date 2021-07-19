const db = require("../models");
const Rides = db.Rides;
const RideStatus = db.RideStatus;
const User = db.User;
const Bookings = db.Bookings;
const BookingStatus = db.BookingStatus;
const Op = db.Sequelize.Op;

const errorMessage = { message: "A problem occured with this request" };

const { findPhoneNumbersInText } = require("libphonenumber-js");
addrs = require("email-addresses");

module.exports = {
  getUserRides(req, res) {
    return Rides.findAll({
      where: {
        DriverId: req.query.userId,
      },
      include: [
        {
          model: RideStatus,
          attributes: {
            exclude: ["RideStatusId"],
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
        res.status(400).json(errorMessage);
      });
  },

  addRide(req, res) {
    const listPhoneNumberInComment = findPhoneNumbersInText(
      req.body.formValues.comment
    );

    const listEmailInComment = addrs.parseAddressList(
      req.body.formValues.comment
    );

    if (listPhoneNumberInComment.length > 0)
      res.status(401).json({
        message: "Please do not include phone numbers in your comment",
      });
    else if (listEmailInComment)
      res
        .status(401)
        .json({ message: "Please do not include emails in your comment" });
    else {
      return Rides.create({
        DriverId: req.body.userId,
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
          // console.log(response);
          res.status(201).send("You ride has been successfully added");
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(errorMessage);
        });
    }
  },

  getRide(req, res) {
    return Rides.findOne({
      where: {
        id: req.params.rideId,
      },
      // order: [["dateTime", "ASC"]],
      // include: [
      //   {
      //     model: User,
      //     attributes: {
      //       exclude: [
      //         "email",
      //         "biography",
      //         "password",
      //         "phoneNumber",
      //         "createdAt",
      //         "updatedAt",
      //       ],
      //     },
      //   },
      // ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getAllRides(req, res) {
    return Rides.findAll({
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
        res.status(400).json(errorMessage);
      });
  },

  bookRide(req, res) {
    // console.log(req.body);
    return Bookings.create({
      UserId: req.body.userId,
      RideId: req.body.rideId,
      seatsBooked: req.body.formValues.seatsNeeded,
    })
      .then((response) => {
        // console.log(response);
        res.status(201).send("You booking has been submitted to the driver");
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getUserBookingRide(req, res) {
    Bookings.findAll({
      where: {
        UserId: req.query.userId,
        RideId: req.query.rideId,
      },
      include: [
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverNewRidesRequests(req, res) {
    return Bookings.findAndCountAll({
      where: {
        [Op.and]: [
          {
            BookingStatusId: 1,
            UserId: {
              [Op.ne]: req.query.userId,
            },
          },
        ],
      },
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: [
          "RideId",
          "UserId",
          "commentPassenger",
          "commentRefused",
          "updatedAt",
          "BookingStatusId",
          // "id",
          // "seatsBooked",
          // "createdAt",
        ],
      },
      include: [
        {
          model: Rides,
          where: {
            DriverId: req.query.userId,
          },
          attributes: {
            exclude: [
              "DriverId",
              "comment",
              "RideStatusId",
              "createdAt",
              "updatedAt",
              // "id",
              // "cityDestination",
              // "cityOrigin",
              // "dateTime",
              // "provinceDestination",
              // "provinceOrigin",
              // "seatsAvailable",
              // "seatsLeft",
            ],
          },
        },
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
        res.status(400).json(errorMessage);
      });
  },

  getDriverAllRidesRequests(req, res) {
    return Bookings.findAll({
      where: {
        UserId: req.query.userId,
      },
      include: [
        {
          model: Rides,
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
        },
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
