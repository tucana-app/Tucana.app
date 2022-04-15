const db = require("../models");
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const RideFeedback = db.RideFeedback;
const Bookings = db.Bookings;
const Op = db.Sequelize.Op;
require("dotenv").config;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getRatingsToDoAsPassenger(req, res) {
    const { userId } = req.query;
    let ratingsToDoPassenger = [];

    (async function () {
      let bookings = await Bookings.findAll({
        where: {
          UserId: userId,
          BookingStatusId: 3, // accepted
        },
      });

      if (bookings.length) {
        await Promise.all(
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
            }).then((ride) => {
              // If the ride is done
              if (ride) {
                // Look for past ratings now

                return RideFeedback.findOne({
                  where: {
                    RideId: ride.id,
                    UserId: userId,
                    rideHappened: true,
                  },
                }).then((feedback) => {
                  if (feedback) {
                    return DriverRating.findOne({
                      where: {
                        RideId: ride.id,
                        UserId: userId,
                      },
                    }).then((rating) => {
                      if (!rating) {
                        // Rating needs to be done
                        ratingsToDoPassenger.push(ride);
                      }
                    });
                  }
                });
              }
            });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsToDoPassenger);
      } else {
        console.log("No bookings");
        return res.status(200).json(ratingsToDoPassenger);
      }
    })();
  },

  getRatingsToDoAsDriver(req, res) {
    const { userId } = req.query;
    let ratingsToDoDriver = [];

    (async function () {
      let bookings = await Bookings.findAll({
        where: {
          DriverId: userId,
          BookingStatusId: 3, // accepted
        },
      });

      if (bookings.length) {
        await Promise.all(
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
            }).then((ride) => {
              // If the ride is done
              if (ride) {
                // Look if the ride has been confirmed
                return RideFeedback.findOne({
                  where: {
                    RideId: ride.id,
                    UserId: userId,
                    rideHappened: true,
                  },
                }).then((feedback) => {
                  if (feedback) {
                    // Look for past ratings now
                    return PassengerRating.findOne({
                      where: {
                        RideId: ride.id,
                        DriverId: userId,
                      },
                    }).then((rating) => {
                      if (!rating) {
                        // Rating needs to be done
                        ratingsToDoDriver.push(ride);
                      }
                    });
                  }
                });
              }
            });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsToDoDriver);
      } else {
        console.log("No bookings");
        return res.status(200).json(ratingsToDoDriver);
      }
    })();
  },

  getRatingsReceivedPassenger(req, res) {
    return PassengerRating.findAll({
      where: {
        UserId: req.query.userId,
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
        UserId: req.query.userId,
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
      UserId: ride.Booking.User.id,
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
      UserId: ride.Booking.User.id,
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
