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

const verifySignUp = {
  checkDuplicate,
};

module.exports = verifySignUp;
