const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "Sign up successful" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: {
        username: req.body.credential,
        email: req.body.credential,
      },
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "An error occured while login" });
    });
};
