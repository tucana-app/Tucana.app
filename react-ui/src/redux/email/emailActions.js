import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// let firstName = "";
// let lastName = "";
// let email = "";
// let username = "";
let subject = "";
let textTemplate = "";
let htmlTemplate = "";

// Sign Up template
const subjectSignup = "Sign up successful | Ride.CR";
const textTemplateSignup = (formSignupUser) => {
  const { firstName, lastName, username, email } = formSignupUser;

  return `Welcome ${firstName} ${lastName} to our platform! You can now login with your username (${username}) or your email address (${email}) at ride-cr.herokuapp.com`;
};

const htmlTemplateSignup = (formSignupUser) => {
  const { firstName, lastName, username, email } = formSignupUser;

  return `<div><h1>Ride.CR</h1>
  <p>Welcome to Ride.CR ${firstName} ${lastName}</p>
  <p>You can now login with your username (${username}) or your email address (${email}) at <a href="http://ride-cr.herokuapp.com" alt="">ride-cr.herokuapp.com</a></p></div>
  `;
};

// Offer a ride template
const textTemplateOfferRide = (user, payload) => {
  const { cityOrigin, cityDestination, seatsAvailable } = payload;

  return `Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can already check it out on our platform at ride-cr.herokuapp.com/find-ride`;
};

const htmlTemplateOfferRide = (user, payload) => {
  const { cityOrigin, cityDestination, seatsAvailable } = payload;

  return `<div>
  <p>Thank you!</p>
  <p>Yes, you are helping the community by sharing your seats</p>
  <p>Your ride from ${cityOrigin} to ${cityDestination} with ${seatsAvailable} seat(s) available is already online! You can check it out on our platform at <a href="http://ride-cr.herokuapp.com" alt="">ride-cr.herokuapp.com/find-ride</a></p>
  </div>`;
};

export const sendEmailSignup = (formSignupUser) => {
  return () => {
    axios
      .post(URL_API + "/email/send-email", {
        firstName: formSignupUser.firstName,
        lastName: formSignupUser.lastName,
        email: formSignupUser.email,
        subject: subjectSignup,
        text: textTemplateSignup(formSignupUser),
        html: htmlTemplateSignup(formSignupUser),
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
};

export const sendEmail = (action, user, payload) => {
  const { firstName, lastName, email } = user;

  switch (action) {
    case "OFFER_RIDE":
      subject = "Your ride is online | Ride.CR";
      textTemplate = textTemplateOfferRide(user, payload);
      htmlTemplate = htmlTemplateOfferRide(user, payload);
      break;

    default:
      break;
  }

  return () => {
    axios.post(URL_API + "/email/send-email", {
      firstName,
      lastName,
      email,
      subject,
      text: textTemplate,
      html: htmlTemplate,
    });
  };
};
