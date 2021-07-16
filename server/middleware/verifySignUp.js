const db = require("../models");
const User = db.User;

checkDuplicate = (req, res, next) => {
  const { username, email } = req;
  // Username
  User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Username already in use",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Email already in use",
        });
        return;
      }

      next();
    });
  });
};

checkDuplicateUserSignUp = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.formSignupUser.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Username already in use",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.formSignupUser.email,
      },
    }).then((email) => {
      if (email) {
        res.status(400).send({
          message: "Email already in use",
        });
        return;
      }

      // Phone number
      User.findOne({
        where: {
          phoneNumber: req.body.formSignupUser.phoneNumber,
        },
      }).then((phoneNumber) => {
        if (phoneNumber) {
          res.status(400).send({
            message: "Phone number already in use",
          });
          return;
        }

        next();
      });
    });
  });
};

const verifySignUp = {
  checkDuplicate,
  checkDuplicateUserSignUp,
};

module.exports = verifySignUp;
