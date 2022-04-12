require("dotenv").config;

module.exports = {
  confirmSignup: (UUID) => ({
    subject: "Confirm your email address | Ride.CR",
    text: `Ride.CR | To access our platform, please confirm your email address following this link: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>To access our platform, please confirm your email address following this link: <a href='${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}'>
      confirm your email</a> or copy-past the link ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}
      </p>
      </div>
    `,
  }),
};
