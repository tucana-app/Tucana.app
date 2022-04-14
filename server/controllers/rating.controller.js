const db = require("../models");
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Bookings = db.Bookings;
const Op = db.Sequelize.Op;
require("dotenv").config;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getRatingsToDoPassenger(req, res) {
    const { userId } = req.query;
    let ratingsToDoPassenger = [];

    Bookings.findAll({
      where: {
        UserId: userId,
        BookingStatusId: 3, // accepted
      },
    })
      .then((bookings) => {
        // console.log(bookings);

        // If some bookings have been found
        if (bookings) {
          bookings.map((booking, index) => {
            return Ride.findOne({
              where: {
                id: booking.RideId,
                RideStatusId: 3, // done
              },
              include: [
                {
                  model: Bookings,
                  include: [
                    {
                      model: User,
                      attributes: {
                        exclude: [
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
                  model: Driver,
                  include: [
                    {
                      model: User,
                      attributes: {
                        exclude: [
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
              ],
            })
              .then((ride) => {
                // If the ride is done
                if (ride) {
                  // Look for past ratings now
                  return DriverRating.findOne({
                    where: {
                      RideId: ride.id,
                      PassengerId: userId,
                    },
                  })
                    .then((rating) => {
                      if (!rating) {
                        // Rating needs to be done
                        ratingsToDoPassenger.push(ride);

                        // if (bookings.length - 1 === index) {
                        //   return res.status(200).json(ratingsToDoPassenger);
                        // }
                      }
                    })
                    .catch((error) => {
                      // Error
                      // console.log(error)
                    });
                } else {
                  // No ride done found for this booking
                  //  res.status(200).json([]);
                }
              })
              .catch((error) => {
                // console.log(error)
                // res.status(400).json(errorMessage);
              });
          });
        } else {
          // No booking accepted found for that user
          res.status(200).json([]);
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });

    // Not good at all! To fix...
    // I can't wait for ALL the promises to stop
    // Then send the array. So I am using a trick
    setTimeout(() => {
      return res.status(200).json(ratingsToDoPassenger);
    }, 1000);
  },

  async getRatingsToDoDriver(req, res) {
    const { userId } = req.query;
    let ratingsToDoDriver = [];

    Bookings.findAll({
      where: {
        DriverId: userId,
        BookingStatusId: 3, // accepted
      },
    })
      .then((bookings) => {
        // console.log(bookings);

        // If some bookings have been found
        if (bookings) {
          bookings.map((booking) => {
            return Ride.findOne({
              where: {
                id: booking.RideId,
                RideStatusId: 3, // done
              },
              include: [
                {
                  model: Bookings,
                  include: [
                    {
                      model: User,
                      attributes: {
                        exclude: [
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
                  model: Driver,
                  include: [
                    {
                      model: User,
                      attributes: {
                        exclude: [
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
              ],
            })
              .then((ride) => {
                // If the ride is done
                if (ride) {
                  // Look for past ratings now
                  PassengerRating.findOne({
                    where: {
                      RideId: ride.id,
                      DriverId: userId,
                    },
                  })
                    .then((rating) => {
                      if (!rating) {
                        // Rating needs to be done
                        ratingsToDoDriver.push(ride);

                        // if (bookings.length - 1 === index) {
                        //   return res.status(200).json(ratingsToDoDriver);
                        // }
                      }
                    })
                    .catch((error) => {
                      // console.log(error)
                      // res.status(400).json(errorMessage);
                    });
                } else {
                  // No ride done found for this booking
                  // res.status(200).json([]);
                }
              })
              .catch((error) => {
                // console.log(error)
                // res.status(400).json(errorMessage);
              });
          });
        } else {
          // No booking accepted found for that user
          res.status(200).json([]);
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });

    // Not good at all! To fix...
    // I can't wait for ALL the promises to stop
    // Then send the array. So I am using a trick
    setTimeout(() => {
      return res.status(200).json(ratingsToDoDriver);
    }, 1000);
  },

  getRatingsReceivedPassenger(req, res) {
    return PassengerRating.findAll({
      where: {
        PassengerId: req.query.userId,
      },
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
    return DriverRating.findAll({
      where: {
        PassengerId: req.query.userId,
      },
    })
      .then((ratings) => {
        // console.log(ratings);
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

  addRatingFromPassenger(req, res) {
    const { ride, note, comment } = req.body;

    return DriverRating.create({
      PassengerId: ride.Booking.User.id,
      DriverId: ride.DriverId,
      RideId: ride.id,
      BookingId: ride.Booking.id,
      value: note,
      comment,
    })
      .then((rating) => {
        // console.log(conversations);
        res.status(201).json({
          message: "Rating submitted for review by an moderator",
          flag: "SUCCESS",
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  addRatingFromDriver(req, res) {
    const { ride, note, comment } = req.body;

    return PassengerRating.create({
      PassengerId: ride.Booking.User.id,
      DriverId: ride.DriverId,
      RideId: ride.id,
      BookingId: ride.Booking.id,
      value: note,
      comment,
    })
      .then((rating) => {
        // console.log(conversations);
        res.status(201).json({
          message: "Rating submitted for review by an moderator",
          flag: "SUCCESS",
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
