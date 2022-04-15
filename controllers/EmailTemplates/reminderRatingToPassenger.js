require("dotenv").config;
const dateFormat = require("dateformat");

module.exports = {
  reminderRatingToPassenger: ({ user, ride, booking }) => ({
    subject: "Reminder to rate your ride | Ride.CR",
    text: `Ride.CR | We would like to know more about your ride from ${
      ride.cityOrigin
    } to ${ride.cityDestination} on the ${dateFormat(
      ride.dateTime,
      "dd/mm/yyyy"
    )}. You can add your rating at ${
      process.env.REACT_APP_URL_CLIENT
    }/ratings/`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>We would like to know more about your ride from ${
        ride.cityOrigin
      } to ${ride.cityDestination} on the ${dateFormat(
      ride.dateTime,
      "dd/mm/yyyy"
    )}
      </p>
      <p>
      You can add your rating at ${process.env.REACT_APP_URL_CLIENT}/ratings/
      </p>
      </div>
    `,
  }),
};
