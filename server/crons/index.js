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
async function checkRidesDone() {
  console.log(`\n\n
    ####################
    # CRON IN PROGRESS #
    ####################\n\n`);

  const messageCronStop = `\n\n
  ####################
  # END OF THE CRON  #
  ####################\n\n`;

  let ride = await Ride.findAll({
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
        Promise.all(
          rides.map((ride) => {
            // We update the ride to "Done"
            return Ride.update(
              {
                RideStatusId: 3,
              },
              {
                where: {
                  id: ride.id,
                },
              }
            );
          })
        ).then((response) => console.log(messageCronStop));
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(messageCronStop);
    });
}

// Start the CRONs
// Every hour
var job = new CronJob(
  // "* * * * * *",
  "0 0 0-23 * * *",
  checkRidesDone,
  null,
  true,
  "America/Costa_Rica"
);

job.start();

// Let it execute only once
// setTimeout(() => {
//   job.stop();
// }, 1000);
