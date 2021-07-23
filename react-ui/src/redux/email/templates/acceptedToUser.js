// const dateFormat = require("dateformat");

module.exports = {
  // User receive a notification when driver refused the booking
  subject: "✅ Your booking has been accepted | Ride.CR",

  textTemplate: (user, payload) => {
    const { booking, formValues } = payload;

    return `You booking for ride by "${user.username}" from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been accepted. Driver's comment: ${formValues.comment}`;
  },

  htmlTemplate: (user, payload) => {
    const { booking, formValues } = payload;

    return `You booking for ride by "${user.username}" from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been accepted. Driver's comment: ${formValues.comment}`;
  },
};
