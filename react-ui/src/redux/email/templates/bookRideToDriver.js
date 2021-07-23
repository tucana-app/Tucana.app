const dateFormat = require("dateformat");

module.exports = {
  // Book a ride template
  subject: "You have a new booking | Ride.CR",

  textTemplate: (user, payload) => {
    const { formValues, ride, passenger } = payload;

    return `Your ride from ${ride.cityOrigin} to ${
      ride.cityDestination
    } (${dateFormat(ride.dateTime, "dd/mm/yyyy")}) has a new booking! 
    The passenger "${passenger.username}" has requested ${
      formValues.seatsNeeded
    } seats. Accept or refuse the booking by clicking here: ${
      process.env.REACT_APP_URL_CLIENT
    }/ride/${ride.id}`;
  },

  htmlTemplate: (user, payload) => {
    const { formValues, ride, passenger } = payload;

    return `<div>
    <h1>
    Your ride from ${ride.cityOrigin} to ${ride.cityDestination} (${dateFormat(
      ride.dateTime,
      "dd/mm/yyyy"
    )}) has a new booking!</h1>
    <p>
    The passenger "${passenger.username}" has requested ${
      formValues.seatsNeeded
    } seats. Accept or refuse the booking by <a href="${
      process.env.REACT_APP_URL_CLIENT
    }/ride/${ride.id}">clicking here</a> or visiting ${
      process.env.REACT_APP_URL_CLIENT
    }/ride/${ride.id}
    </p>
    </div>`;
  },
};
