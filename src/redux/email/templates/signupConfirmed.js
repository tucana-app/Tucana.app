module.exports = {
  // Sign Up template
  subject: "Sign up successful | Ride.CR",
  textTemplate: (formSignupUser) => {
    const { firstName, lastName, username } = formSignupUser;

    return `Welcome ${firstName} ${lastName} to our platform! You can now login with your username (${username}) or your email address at ${process.env.REACT_APP_URL_CLIENT}`;
  },

  htmlTemplate: (formSignupUser) => {
    const { firstName, lastName, username, email } = formSignupUser;

    return `<div><h1>Ride.CR</h1>
  <p>Welcome to Ride.CR ${firstName} ${lastName}</p>
  <p>You can now login with your username (${username}) or your email address (${email}) at <a href="${process.env.REACT_APP_URL_CLIENT}" alt="">${process.env.REACT_APP_URL_CLIENT}</a></p></div>
  `;
  },
};
