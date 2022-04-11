var nodemailer = require("nodemailer");
require("dotenv").config;

const { findEmails, findPhones, findLinks } = require("./functions/functions");
const { convert } = require("html-to-text");

const errorMessage = { message: "The email could't be sent" };

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
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

    if (text.length === 0)
      res.status(401).json({
        message: "Your message cannot be empty",
      });

    linksFound = findLinks(text);
    phonesFound = findPhones(text);
    emailsFound = findEmails(text);
    messageConverted = convert(text);

    if (linksFound && linksFound.length > 0) {
      res.status(401).json({
        message: "Do not include links",
      });
    } else if (phonesFound.length > 0) {
      res.status(401).json({
        message: "Do not include phone numbers",
      });
    } else if (emailsFound && emailsFound.length > 0) {
      res.status(401).json({
        message: "Do not include emails",
      });
    } else {
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
          // console.log("Email sent: " + info);
          return res.status(200).json({ message: "Email sent" });
        }
      });
    }
  },

  sendEmailForgotPassword(user, template) {
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
        return res.status(400).json(error);
      } else {
        // console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });
  },

  sendEmailResetPasswordSuccess(user, template) {
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
        return res.status(400).json(error);
      } else {
        // console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });
  },
};
