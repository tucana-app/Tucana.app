var nodemailer = require("nodemailer");
require("dotenv").config;

const errorMessage = { message: "The email could't be sent" };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = {
  sendEmailSignup(user, template) {
    var mailOptions = {
      from: `Ride.CR <${process.env.EMAIL_ADDRESS}>`,
      to: `${user.firstName} ${user.lastName} <${user.email}>`,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
        return res.status(400).json(errorMessage);
      } else {
        // console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });
  },

  sendEmail(req, res) {
    const { firstName, lastName, email, subject, text, html } = req.body;

    var mailOptions = {
      from: `Ride.CR <${process.env.EMAIL_ADDRESS}>`,
      to: `${firstName} ${lastName} <${email}>`,
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
        return res.status(400).json(errorMessage);
      } else {
        // console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });
  },
};
