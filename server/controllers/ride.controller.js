const db = require("../models");
const Rides = db.Rides;
const RideStatus = db.RideStatus;
const User = db.User;
const Bookings = db.Bookings;
const BookingStatus = db.BookingStatus;
const Op = db.Sequelize.Op;

const errorMessage = { message: "A problem occured with this request" };

const { findPhoneNumbersInText } = require("libphonenumber-js");

function extractEmails(string) {
  return string.match(
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
  );
}

module.exports = {
  getDriverRides(req, res) {
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

    const listEmailInComment = extractEmails(req.body.formValues.comment);

    if (listPhoneNumberInComment.length > 0)
      res.status(401).json({
        message: "Please do not include phone numbers in your comment",
      });
    else if (listEmailInComment && listEmailInComment.length > 0)
      res.status(401).json({
        message: "Please do not include emails in your comment",
      });
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
          res
            .status(201)
            .json({ message: "You ride has been successfully added" });
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

  getBooking(req, res) {
    return Bookings.findOne({
      where: {
        id: req.params.bookingId,
      },
      order: [["createdAt", "ASC"]],
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

  getDriverBookings(req, res) {
    return Bookings.findAll({
      where: {
        DriverId: req.query.userId,
        BookingStatusId: 1,
      },
      order: [["createdAt", "ASC"]],
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
        {
          model: Rides,
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
        console.log(error);
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
    if (req.body.formValues.seatsNeeded === 0) {
      res.status(400).json({ message: "How many seats do you need?" });
    } else {
      return Bookings.create({
        UserId: req.body.userId,
        RideId: req.body.rideId,
        DriverId: req.body.driverId,
        seatsBooked: req.body.formValues.seatsNeeded,
      })
        .then((response) => {
          // console.log(response);
          res
            .status(201)
            .json({ message: "Your booking has been submitted to the driver" });
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(errorMessage);
        });
    }
  },

  driverResponseBooking(req, res) {
    const { comment, newStatus, bookingId, newSeatsAvailable, rideId } =
      req.body.formValues;

    // if booking accepted by driver
    if (newStatus === 3) {
      return Bookings.update(
        {
          commentDriver: comment,
          BookingStatusId: newStatus,
        },
        {
          where: {
            id: bookingId,
          },
        }
      ).then((response) => {
        return Rides.update(
          {
            seatsLeft: newSeatsAvailable,
          },
          {
            where: {
              id: rideId,
            },
          }
        )
          .then((response) => {
            // console.log(response);

            res
              .status(200)
              .send({
                message: "You have accepted the booking",
                newStatus,
              })
              .catch((error) => {
                // console.log(error);
                res.status(400).json(error);
              });
          })
          .catch((error) => {
            // console.log(error);
            res.status(400).json(error);
          });
      });
    }

    // if booking refused by driver
    if (newStatus === 4) {
      return Bookings.update(
        {
          commentDriver: comment,
          BookingStatusId: newStatus,
        },
        {
          where: {
            id: bookingId,
          },
        }
      )
        .then((response) => {
          // console.log(response);
          res
            .status(200)
            .send({ message: "You have refused this booking", newStatus });
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(error);
        });
    }
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

  getDriverBookingRide(req, res) {
    Bookings.findAll({
      where: {
        DriverId: req.query.driverId,
        RideId: req.query.rideId,
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: BookingStatus,
        },
        {
          model: User,
          attributes: {
            exclude: [
              "firstName",
              "lastName",
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

  getDriverNewRidesRequests(req, res) {
    return Bookings.findAndCountAll({
      where: {
        BookingStatusId: 1,
        DriverId: req.query.driverId,
      },
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: [
          "RideId",
          "UserId",
          "commentPassenger",
          "commentDriver",
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
            DriverId: req.query.driverId,
            seatsLeft: {
              [Op.gt]: 0,
            },
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

  getUserBookings(req, res) {
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

  getPassengers(req, res) {
    return Bookings.findAll({
      where: {
        RideId: req.query.rideId,
        BookingStatusId: {
          [Op.ne]: 4,
        },
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        {
          model: Rides,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
