const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

module.exports = {
  signup(req, res) {
    const { firstName, lastName, email, password, username, phoneNumber } =
      req.body.formSignupUser;

    User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password: bcrypt.hashSync(password, 8),
    })
      .then((user) => {
        // console.log(user);
        res.status(201).send({ message: "Sign up successful" });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({ message: error.message });
      });
  },

  signin(req, res) {
    User.findOne({
      where: {
        [Op.or]: {
          username: req.body.formLogin.credential,
          username: req.body.formLogin.credential.toLowerCase(),
          email: req.body.formLogin.credential,
          email: req.body.formLogin.credential.toLowerCase(),
        },
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.formLogin.password,
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
        // console.log(error);
        res.status(500).send({ message: "An error occured while login" });
      });
  },
};
