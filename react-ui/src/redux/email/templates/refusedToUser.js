// const dateFormat = require("dateformat");

module.exports = {
  // User receive a notification when driver refused the booking
  subject: "Your booking has been refused | Ride.CR",

  textTemplate: (user, payload) => {
    const { booking, formValues } = payload;

    return `You booking for ride by "${booking.Ride.Driver.User.username}" from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been refused. Reason: ${formValues.comment}`;
  },

  htmlTemplate: (user, payload) => {
    const { booking, formValues } = payload;

    return `You booking for ride by "${booking.Ride.Driver.User.username}" from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been refused. Reason: ${formValues.comment}`;
  },
};
