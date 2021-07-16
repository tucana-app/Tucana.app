const db = require("../models");
const User = db.User;
var bcrypt = require("bcryptjs");

module.exports = {
  checkDuplicateUsername(req, res) {
    User.findOne({
      where: {
        username: req.query.username,
      },
    })
      .then((user) => {
        if (user) {
          res.status(200).send({
            message: "Username already in use",
            isUsernameDuplicate: true,
          });
        } else {
          res.status(200).send({
            message: "No username duplicate found",
            isUsernameDuplicate: false,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send(error);
      });
  },

  checkDuplicateEmail(req, res) {
    const {} = req;

    User.findOne({
      where: {
        email: req.query.email,
      },
    })
      .then((email) => {
        if (email) {
          res.status(200).send({
            message: "Email already in use",
            isEmailDuplicate: true,
          });
        } else {
          res.status(200).send({
            message: "No email duplicate found",
            isEmailDuplicate: false,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.sendStatus(400).send(error);
      });
  },

  checkDuplicatePhoneNumber(req, res) {
    User.findOne({
      where: {
        phoneNumber: req.query.phoneNumber,
      },
    })
      .then((phoneNumber) => {
        if (phoneNumber) {
          res.status(200).send({
            message: "Phone number already in use",
            isPhoneNumberDuplicate: true,
          });
        } else {
          res.status(200).send({
            message: "No phone number duplicate found",
            isPhoneNumberDuplicate: false,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.sendStatus(400).send(error);
      });
  },

  signupUser(req, res) {
    // Save User to Database
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      dateOfBirth,
      phoneNumber,
    } = req.body.formSignupUser;

    User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 8),
      username,
      dateOfBirth,
      phoneNumber,
    })
      .then((_response) => {
        res
          .status(200)
          .send({ isSuccessful: true, message: "Sign up successful" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ isSuccessful: false, message: error.message });
      });
  },
};
