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
        rides.map((ride) => {
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
          ).catch((error) => {
            // An error occured
            console.log(error);
          });

          // If no booking were made on the ride
          if (ride.seatsAvailable !== ride.seatsLeft) {
            // The ride has had bookings, next step is to get the accepted booking (3)
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
                } else {
                  bookings.map((booking) => {
                    // First, the passenger's rating
                    PassengerRating.findOne({
                      where: {
                        BookingId: booking.id,
                        RideId: booking.RideId,
                        UserId: booking.UserId,
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
