require("dotenv").config;

module.exports = {
  forgotPassword: (UUID) => ({
    subject: "Forgot your password | Ride.CR",
    text: `Ride.CR | To create a new password, please click on this link: ${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>To create a new password, please <a href='${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}'>
      click on this link</a> or copy-past the link ${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}
      </p>
      </div>
    `,
  }),
};
