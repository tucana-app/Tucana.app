require("dotenv").config;

module.exports = {
  confirmSignup: (confirmEmailUUID) => ({
    subject: "Confirm your email address | Ride.CR",
    text: `Ride.CR | To access our platform, please confirm your email address following this link: ${process.env.CLIENT_BASE_URL}/confirm/${confirmEmailUUID}`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>To access our platform, please confirm your email address following this link: <a href='${process.env.CLIENT_BASE_URL}/confirm/${confirmEmailUUID}'>
      confirm your email</a>
      </p>
      </div>
    `,
  }),
};
