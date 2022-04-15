const db = require("../models");
const User = db.User;
const Admin = db.Admin;

checkDuplicate = (req, res, next) => {
  const { email, username, phoneNumber } = req.body.formSignupUser;

  // Username
  return User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Username already in use",
      });
    } else {
      // Username in Admin
      return Admin.findOne({
        where: {
          username,
        },
      }).then((admin) => {
        if (admin) {
          res.status(400).send({
            message: "Username already in use",
          });
        } else {
          // Email
          return User.findOne({
            where: {
              email: email,
            },
          }).then((user) => {
            if (user) {
              // Email already exist, maybe user hasn't confirmed

              if (user.emailConfirmed) {
                // Email already confirmed, so is already in use

                res.status(400).send({
                  message: "Email already in use",
                  flag: "CONFIRMED",
                });
              } else {
                // Email already confirmed, so is already in use
                res.status(400).send({
                  message: "Email already in use, but not confirmed yet",
                  flag: "NOT_CONFIRMED",
                });
              }
            } else {
              // Phone number
              return User.findOne({
                where: {
                  phoneNumber,
                },
              }).then((phoneNumber) => {
                if (phoneNumber) {
                  res.status(400).send({
                    message: "Phone number already in use",
                  });
                }

                next();
              });
            }
          });
        }
      });
    }
  });
};

const verifySignUp = {
  checkDuplicate,
};

module.exports = verifySignUp;
