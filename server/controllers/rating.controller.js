const db = require("../models");
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const User = db.User;
const Ride = db.Ride;
const Bookings = db.Bookings;
const Op = db.Sequelize.Op;
require("dotenv").config;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  // getUserRatingsToDoPassenger(req, res) {
  //   const { userId } = req.query;

  //   return Bookings.findAll({
  //     where: {
  //       [Op.or]: {
  //         DriverId: userId,
  //       },
  //       BookingStatusId: 3, // accepted
  //     },
  //   })
  //     .then((bookings) => {
  //       // console.log(bookings);

  //       // If some bookings have been found
  //       if (bookings) {
  //         bookings.map((booking, index) => {
  //           return Ride.findOne({
  //             where: {
  //               id: booking.RideId,
  //               RideStatusId: 3, // done
  //             },
  //           })
  //             .then((ride) => {
  //               // console.log(ride);

  //               if (ride) {
  //                 // Ride done found
  //                 // Look for past reviews now

  //                 return PassengerRating.findOne({
  //                   where: {
  //                     RideId: ride.id,
  //                     DriverId: userId,
  //                   },
  //                 })
  //                   .then((rating) => {
  //                     if (rating) {
  //                       res
  //                         .status(200)
  //                         .json({ message: "A rating already exist" });
  //                     } else {
  //                       res
  //                         .status(200)
  //                         .json({ message: "Rating needs to be done" });
  //                     }
  //                   })
  //                   .catch((error) => {
  //                     // console.log(error);
  //                     res.status(400).json(errorMessage);
  //                   });
  //               } else {
  //                 // No ride done found for that user
  //                 res
  //                   .status(200)
  //                   .json({ message: "No ride done has been found" });
  //               }
  //             })
  //             .catch((error) => {
  //               // console.log(error);
  //               res.status(400).json(errorMessage);
  //             });
  //         });
  //       } else {
  //         // No booking accepted found for that user
  //         res.status(200).json({ message: "No bookings has been made yet" });
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       res.status(400).json(errorMessage);
  //     });
  // },

  getRatingsReceivedPassenger(req, res) {
    return DriverRating.findAll({
      where: {
        PassengerId: req.query.userId,
      },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsGivenPassenger(req, res) {
    return PassengerRating.findAll({
      where: {
        PassengerId: req.query.userId,
      },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsReceivedDriver(req, res) {
    return DriverRating.findAll({
      where: {
        DriverId: req.query.userId,
      },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsGivenDriver(req, res) {
    return PassengerRating.findAll({
      where: {
        DriverId: req.query.userId,
      },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
