module.exports = {
  // Sign Up template
  subjectSignupConfirmed: "Sign up successful | Ride.CR",
  textTemplateSignupConfirmed: (formSignupUser) => {
    const { firstName, lastName, username, email } = formSignupUser;

    return `Welcome ${firstName} ${lastName} to our platform! You can now login with your username (${username}) or your email address (${email}) at ride-cr.herokuapp.com`;
  },

  htmlTemplateSignupConfirmed: (formSignupUser) => {
    const { firstName, lastName, username, email } = formSignupUser;

    return `<div><h1>Ride.CR</h1>
  <p>Welcome to Ride.CR ${firstName} ${lastName}</p>
  <p>You can now login with your username (${username}) or your email address (${email}) at <a href="http://ride-cr.herokuapp.com" alt="">ride-cr.herokuapp.com</a></p></div>
  `;
  },
};
