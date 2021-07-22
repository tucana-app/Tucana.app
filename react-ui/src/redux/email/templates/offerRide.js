module.exports = {
  // Offer a ride template
  textTemplateOfferRide: (user, payload) => {
    const { cityOrigin, cityDestination, seatsAvailable } = payload;

    return `Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can already check it out on our platform at ride-cr.herokuapp.com/find-ride`;
  },

  htmlTemplateOfferRide: (user, payload) => {
    const { cityOrigin, cityDestination, seatsAvailable } = payload;

    return `<div>
  <p>Thank you!</p>
  <p>Yes, you are helping the community by sharing your seats</p>
  <p>Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can check it out on our platform at <a href="http://ride-cr.herokuapp.com" alt="">ride-cr.herokuapp.com/find-ride</a></p>
  </div>`;
  },
};
