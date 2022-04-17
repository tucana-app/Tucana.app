const dateFormat = require("dateformat");

module.exports = {
  // Driver receive a notification when refusing the booking
  subject: "You have refused a booking | Ride.CR",

  textTemplate: (user, payload) => {
    const { booking } = payload;

    return `You have refused the booking of "${
      booking.User.firstName
    }" on your ride from ${booking.Ride.cityOrigin} to ${
      booking.Ride.cityDestination
    } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;
  },

  htmlTemplate: (user, payload) => {
    const { booking } = payload;

    return `You have refused the booking of "${
      booking.User.firstName
    }" on your ride from ${booking.Ride.cityOrigin} to ${
      booking.Ride.cityDestination
    } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;
  },
};
