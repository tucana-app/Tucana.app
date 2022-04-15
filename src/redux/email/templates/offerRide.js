module.exports = {
  // Offer a ride template
  subject: "Your ride is online | Ride.CR",
  textTemplate: (user, payload) => {
    const { cityOrigin, cityDestination, seatsAvailable } = payload;

    return `Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can already check it out on our platform at ${process.env.REACT_APP_URL_CLIENT}/find-ride`;
  },

  htmlTemplate: (user, payload) => {
    const { cityOrigin, cityDestination, seatsAvailable } = payload;

    return `<div>
  <p>Thank you!</p>
  <p>Yes, you are helping the community by sharing your seats</p>
  <p>Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can check it out on our platform at <a href="${process.env.REACT_APP_URL_CLIENT}/find-ride" alt="">${process.env.REACT_APP_URL_CLIENT}/find-ride</a></p>
  </div>`;
  },
};
