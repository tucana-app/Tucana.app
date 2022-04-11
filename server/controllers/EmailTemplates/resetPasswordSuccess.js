require("dotenv").config;

module.exports = {
  resetPasswordSuccess: (user) => ({
    subject: "Password reset successful | Ride.CR",
    text: `Ride.CR | You have successfully reset your password. You can now login here: ${process.env.REACT_APP_URL_CLIENT}/login`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>You have successfully reset your password. You can now login <a href='${process.env.REACT_APP_URL_CLIENT}/login'>
      by clicking on this link</a> or copy-past the link ${process.env.REACT_APP_URL_CLIENT}/login
      </p>
      </div>
    `,
  }),
};
