// https://www.npmjs.com/package/cron

const db = require("../models");
const emailController = require("../controllers/email.controller");
const templateReminderRatingToPassenger = require("../controllers/EmailTemplates/reminderRatingToPassenger");
const templateReminderRatingToDriver = require("../controllers/EmailTemplates/reminderRatingToDriver");
const User = db.User;
const Ride = db.Ride;
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const Bookings = db.Bookings;
const emailReminderRating = db.emailReminderRating;
const Op = db.Sequelize.Op;
// const checkRideStatus = require("./checkRideStatus");

var CronJob = require("cron").CronJob;

// Function
const checkRideStatus = () => {
  console.log(`\n\n
    ####################
    # CRON IN PROGRESS #
    ####################\n\n`);

  const messageCronStop = `\n\n
  ####################
  # END OF THE CRON  #
  ####################\n\n`;

  return Ride.findAll({
    where: {
      dateTime: {
        [Op.lt]: new Date(),
      },
      // If the ride is NOT "Done" or greater
      RideStatusId: {
        [Op.lt]: 3,
      },
    },
  })
    .then((rides) => {
      // console.log(rides);

      if (rides) {
        // Mapping through the rides we found
        rides.map((ride, index) => {
          // We update the ride to "Done"
          Ride.update(
            {
              RideStatusId: 3,
            },
            {
              where: {
                id: ride.id,
              },
            }
          )
            .then((update) => {
              // All good here
              console.log(messageCronStop);
            })
            .catch((error) => {
              // An error occured
              console.log(error);
              console.log(messageCronStop);
            });

          // If no booking were made on the ride
          if (ride.seatsAvailable !== ride.seatsLeft) {
            // The ride has had bookings, next step is to get the booking accepted (3)
            return Bookings.findAll({
              where: {
                RideId: ride.id,
                BookingStatusId: 3,
              },
            })
              .then((bookings) => {
                // console.log(bookings);

                // If no bookings, a problem happens
                if (!bookings) {
                  console.log("No bookings found");
                  console.log(messageCronStop);
                } else {
                  bookings.map((booking, index) => {
                    // First, the passenger's rating
                    PassengerRating.findOne({
                      where: {
                        BookingId: booking.id,
                        RideId: booking.RideId,
                        PassengerId: booking.UserId,
                      },
                    })
                      .then((passengerRating) => {
                        // If there is no passenger's rating yet
                        if (passengerRating) {
                          // The passenger has rated already
                          // JOB DONE
                          console.log(messageCronStop);
                        } else {
                          // Check if we already have sent an email
                          return emailReminderRating
                            .findOne({
                              where: {
                                UserId: booking.UserId,
                                RideId: booking.RideId,
                                BookingId: booking.id,
                              },
                            })
                            .then((reminder) => {
                              if (!reminder) {
                                // The reminder hasn't been sent yet
                                // Send email reminder to the passenger

                                return User.findOne({
                                  where: {
                                    id: booking.UserId,
                                  },
                                })
                                  .then((user) => {
                                    if (user) {
                                      // Send the reminder email
                                      emailController.sendEmailBasic(
                                        user,
                                        templateReminderRatingToPassenger.reminderRatingToPassenger(
                                          {
                                            user,
                                            ride,
                                            booking,
                                          }
                                        )
                                      );

                                      // Creating the reminder
                                      return emailReminderRating
                                        .create({
                                          UserId: booking.UserId,
                                          RideId: booking.RideId,
                                          BookingId: booking.id,
                                        })
                                        .then((response) => {
                                          // All done here | Next is driver
                                        })
                                        .catch((error) => {
                                          // An error occured
                                          console.log(error);
                                          console.log(messageCronStop);
                                        });
                                    } else {
                                      console.log(messageCronStop);
                                    }
                                  })
                                  .catch((error) => {
                                    // An error occured
                                    console.log(error);
                                    console.log(messageCronStop);
                                  });
                              } else {
                                // A reminder has already being sent out to the passenger
                                console.log(messageCronStop);
                              }
                            })
                            .catch((error) => {
                              // An error occured
                              console.log(error);
                              console.log(messageCronStop);
                            });
                        }
                      })
                      .catch((error) => {
                        // An error occured
                        console.log(error);
                        console.log(messageCronStop);
                      });

                    // Second, the driver's rating
                    return DriverRating.findOne({
                      where: {
                        BookingId: booking.id,
                        RideId: booking.RideId,
                        DriverId: booking.DriverId,
                      },
                    })
                      .then((driverRating) => {
                        if (driverRating) {
                          // The driver has rated already
                          // JOB DONE
                          console.log(messageCronStop);
                        } else {
                          // Check if we already have sent an email
                          return emailReminderRating
                            .findOne({
                              where: {
                                UserId: booking.DriverId,
                                RideId: booking.RideId,
                                BookingId: booking.id,
                              },
                            })
                            .then((reminder) => {
                              if (!reminder) {
                                // The reminder hasn't been sent yet
                                // Send email reminder to the driver

                                return User.findOne({
                                  where: {
                                    id: booking.DriverId,
                                  },
                                })
                                  .then((user) => {
                                    if (user) {
                                      // Send the reminder email
                                      emailController.sendEmailBasic(
                                        user,
                                        templateReminderRatingToDriver.reminderRatingToDriver(
                                          {
                                            user,
                                            ride,
                                            booking,
                                          }
                                        )
                                      );

                                      // Creating the reminder
                                      return emailReminderRating
                                        .create({
                                          UserId: booking.DriverId,
                                          RideId: booking.RideId,
                                          BookingId: booking.id,
                                        })
                                        .then((response) => {
                                          // Done
                                          console.log(messageCronStop);
                                        })
                                        .catch((error) => {
                                          // An error occured
                                          console.log(error);
                                          console.log(messageCronStop);
                                        });
                                    } else {
                                      console.log(messageCronStop);
                                    }
                                  })
                                  .catch((error) => {
                                    // An error occured
                                    console.log(error);
                                    console.log(messageCronStop);
                                  });
                              } else {
                                // A reminder has already being sent out to the driver
                                console.log(messageCronStop);
                              }
                            })
                            .catch((error) => {
                              // An error occured
                              console.log(error);
                              console.log(messageCronStop);
                            });
                        }
                      })
                      .catch((error) => {
                        // An error occured
                        console.log(error);
                        console.log(messageCronStop);
                      });
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(messageCronStop);
              });
          }
        });
      } else {
        console.log(messageCronStop);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(messageCronStop);
    });
};

// Start the CRONs
// Every hour
var job = new CronJob(
  "0 0 0-23 * * *",
  checkRideStatus,
  null,
  true,
  "America/Costa_Rica"
);

job.start();

// Let it execute only once
// setTimeout(() => {
//   job.stop();
// }, 1000);
