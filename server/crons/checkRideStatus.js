const db = require("../models");
const Ride = db.Ride;
const Op = db.Sequelize.Op;

function checkRideStatus() {
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
          // If no booking were made on the ride, we simply update the ride to "Done"
          if (ride.seatsAvailable === ride.seatsLeft) {
            return Ride.update(
              {
                RideStatusId: 4,
              },
              {
                where: {
                  id: ride.id,
                },
              }
            )
              .then((update) => {
                // All good here
                job.stop();
                console.log(messageCronStop);
              })
              .catch((error) => {
                // An error occured
                console.log(error);
                job.stop();
                console.log(messageCronStop);
              });
          } else {
            // #1 Passenger Rating
            // The ride has had bookings, next step is to check if they have ratings already
            return PassengerRating.findAll({
              where: {
                RideId: ride.id,
              },
            })
              .then((ratings) => {
                // console.log(`Ratings found: ${ratings.count}`);

                // If there are already ratings for this ride
                if (ratings.count > 0) {
                  console.log(`Ratings: ${ratings.rows}`);
                  job.stop();
                  console.log(messageCronStop);
                } else {
                  job.stop();
                  console.log(messageCronStop);
                }
              })
              .catch((error) => {
                console.log(`An error occured: ${error}`);
                job.stop();
                console.log(messageCronStop);
              });

            // #2 Driver Rating
            // The ride has had bookings, next step is to check if they have ratings already

            // Code here
          }
        });
      } else {
        job.stop();
        console.log(messageCronStop);
      }
    })
    .catch((error) => {
      console.log(`An error occured: ${error}`);
      job.stop();
      console.log(messageCronStop);
    });
}
// Command to stop the cron

module.exports = {
  checkRideStatus,
};
