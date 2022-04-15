require("dotenv").config;

module.exports = {
  newMessage: () => ({
    subject: "New Message | Ride.CR",
    text: `Ride.CR | You have received a new message, visit ${process.env.REACT_APP_URL_CLIENT}/messages`,
    html: `
      <div>
      <h1>Ride.CR</h1>
      <p>You have received a new message, visit <a href='${process.env.REACT_APP_URL_CLIENT}/messages'>
      ${process.env.REACT_APP_URL_CLIENT}/messages</a>
      </p>
      </div>
    `,
  }),
};
