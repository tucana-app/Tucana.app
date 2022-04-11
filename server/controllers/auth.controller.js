const db = require("../models");
const config = require("../config/auth.config");
const emailController = require("./email.controller");
const templateSignup = require("./EmailTemplates/signup");
const templateForgotPassword = require("./EmailTemplates/forgotPassword");
const templateResetPasswordSuccess = require("./EmailTemplates/resetPasswordSuccess");
const validator = require("validator");
const User = db.User;
const Driver = db.Driver;
const Admin = db.Admin;
const Op = db.Sequelize.Op;
const ConfirmEmail = db.ConfirmEmail;
const ForgotPassword = db.ForgotPassword;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

module.exports = {
  signup(req, res) {
    const { firstName, lastName, email, password, username, phoneNumber } =
      req.body.formSignupUser;

    return User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      emailConfirmed: false,
      phoneConfirmed: false,
    })
      .then((user) => {
        return ConfirmEmail.create({
          UserId: user.id,
          UUID: uuidv4(),
        })
          .then((confirmEmailLine) => {
            emailController.sendEmailSignup(
              user,
              templateSignup.confirmSignup(confirmEmailLine.UUID)
            );

            res.status(201).send({ message: "Sign up successful" });
          })
          .catch((error) => {
            res.status(400).send({ message: "An error occured" });
          });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send({ message: error.message });
      });
  },

  confirmEmail(req, res) {
    // Check if the UUID provided over the put call is valid
    if (validator.isUUID(req.body.confirmEmailUUID)) {
      // Check first if the email has already been confirmed
      return ConfirmEmail.findOne({
        where: {
          UUID: req.body.confirmEmailUUID,
        },
      })
        .then((confirmation) => {
          if (confirmation) {
            return User.findOne({
              where: {
                id: confirmation.UserId,
              },
            })
              .then((user) => {
                if (!user.emailConfirmed) {
                  // Email not confirmed yet
                  return User.update(
                    {
                      emailConfirmed: true,
                    },
                    {
                      where: {
                        id: confirmation.UserId,
                      },
                    }
                  )
                    .then((response) => {
                      res.status(200).json({
                        flag: "CONFIRMED_SUCCESS",
                        message: "You're email address has been confirmed",
                      });

                      return ConfirmEmail.destroy({
                        where: {
                          UserId: confirmation.UserId,
                        },
                      })
                        .then((response) => {
                          // console.log(response)
                        })
                        .catch((error) => {
                          res.status(400).json({
                            flag: "FAIL_FIND_UUID",
                            message: "We couldn't confirm your email address",
                          });
                        });
                    })
                    .catch((error) => {
                      // console.log(error);
                      res.status(400).json({
                        flag: "FAIL_UPDATE_CONFIRM",
                        message: "We couldn't confirm your email address",
                      });
                    });
                } else {
                  // Email has already been confirmed
                  res.status(200).json({
                    flag: "ALREADY_CONFIRMED",
                    message: "Your email address has already been confirmed",
                  });
                }
              })
              .catch((error) => {
                // console.log(error);
                res.status(400).json({
                  flag: "FAIL_FIND_UUID",
                  message: "We couldn't confirm your email address",
                });
              });
          } else {
            res
              .status(400)
              .json({ message: "This confirmation link is deprecated" });
          }
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json({
            flag: "ERROR_DB",
            message: "There is a problem with the database",
          });
        });
    } else {
      res.status(401).json({
        flag: "UNAUTHORIZED",
        message: "How did you do this API call?",
      });
    }
  },

  signin(req, res) {
    return User.findOne({
      where: {
        [Op.or]: {
          username: req.body.formLogin.credential,
          username: req.body.formLogin.credential.toLowerCase(),
          email: req.body.formLogin.credential,
          email: req.body.formLogin.credential.toLowerCase(),
        },
      },
      include: [
        {
          model: Driver,
          attributes: {
            exclude: ["UserId", "createdAt", "updatedAt"],
          },
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return Admin.findOne({
            where: {
              [Op.or]: {
                username: req.body.formLogin.credential,
                username: req.body.formLogin.credential.toLowerCase(),
                email: req.body.formLogin.credential,
                email: req.body.formLogin.credential.toLowerCase(),
              },
            },
          })
            .then((admin) => {
              if (!admin) {
                res
                  .status(404)
                  .send({ message: "User not found", flag: "GENERAL_ERROR" });
              } else {
                var passwordIsValid = bcrypt.compareSync(
                  req.body.formLogin.password,
                  admin.password
                );

                if (!passwordIsValid) {
                  res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password",
                  });
                }

                var token = jwt.sign({ id: admin.id }, config.secret, {
                  expiresIn: 604800, // 7 days
                });

                res.status(200).send({
                  adminId: admin.id,
                  firstName: admin.firstName,
                  lastName: admin.lastName,
                  username: admin.username,
                  email: admin.email,
                  createdAt: admin.createdAt,
                  accessToken: token,
                });
              }
            })
            .catch((error) => {
              // console.log(error);
              res.status(500).send({
                message: "It looks like we can't log you in right now",
                flag: "GENERAL_ERROR",
              });
            });
        }

        if (user.emailConfirmed) {
          var passwordIsValid = bcrypt.compareSync(
            req.body.formLogin.password,
            user.password
          );

          if (!passwordIsValid) {
            res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
            });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800, // 7 days
          });

          res.status(200).send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            biography: user.biography,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
            emailConfirmed: user.emailConfirmed,
            phoneConfirmed: user.phoneConfirmed,
            accessToken: token,
            Driver: user.Driver,
          });
        } else {
          // User hasn't confirmed the email yet
          res.status(400).json({
            message: "Email not confirmed yet",
            flag: "NOT_CONFIRMED",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "It looks like we can't log you in right now",
          flag: "GENERAL_ERROR",
        });
      });
  },

  sendForgotPasswordEmail(req, res) {
    return User.findOne({
      where: {
        [Op.or]: {
          email: req.query.email,
          email: req.query.email.toLowerCase(),
        },
      },
    })
      .then((user) => {
        if (!user) {
          // Email not found
          return res.status(200).json({
            message:
              "If your email address exists, please verify your inbox for a password reset link email",
          });
        } else {
          // Email found

          return ForgotPassword.findOne({
            where: {
              UserId: user.id,
            },
          })
            .then((line) => {
              // If a past attempt has been found
              if (line) {
                // If user tried 4 times to send the password reset link
                if (line.attempts >= 4) {
                  res.status(400).send({
                    message: `You attempted ${line.attempts} times to send the password reset link. Please contact us to reset your password`,
                  });
                } else {
                  return ForgotPassword.update(
                    {
                      attempts: line.attempts + 1,
                    },
                    {
                      where: {
                        UserId: user.id,
                      },
                    }
                  )
                    .then((response) => {
                      emailController.sendEmailForgotPassword(
                        user,
                        templateForgotPassword.forgotPassword(line.UUID)
                      );

                      res.status(200).send({
                        message:
                          "If your email address exists, please verify your inbox for a password reset link email",
                      });
                    })
                    .catch((error) => {
                      // console.log(error);
                      res.status(400).json({
                        message: "There is an error with this request",
                        flag: "DB_ERROR",
                      });
                    });
                }
                // If no past attempts has been found
              } else {
                return ForgotPassword.create({
                  UserId: user.id,
                  UUID: uuidv4(),
                })
                  .then((newLine) => {
                    emailController.sendEmailForgotPassword(
                      user,
                      templateForgotPassword.forgotPassword(newLine.UUID)
                    );

                    res.status(201).send({
                      message:
                        "If your email address exists, please verify your inbox for a password reset link email",
                    });
                  })
                  .catch((error) => {
                    // console.log(error);
                    res.status(400).json({
                      message: "There is an error with this request",
                      flag: "DB_ERROR",
                    });
                  });
              }
            })
            .catch((error) => {
              res.status(400).send({ message: "There is an error" });
            });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "There is an error with your request",
          flag: "GENERAL_ERROR",
        });
      });
  },

  checkDeprecatedLinkResetPassword(req, res) {
    const { uuid } = req.query;

    return ForgotPassword.findOne({
      where: {
        UUID: uuid,
      },
    })
      .then((line) => {
        if (line) {
          res.status(200).json({ message: "UUID found", flag: "SUCCESS" });
        } else {
          res.status(404).json({ message: "UUID not found", flag: "FAIL" });
        }
      })
      .catch((error) => {
        res.status(400).json({ message: "UUID not found", flag: "FAIL" });
      });
  },

  resetPassword(req, res) {
    const { hashedPassword, uuid } = req.body;

    // Check if the UUID provided is valid
    if (validator.isUUID(uuid)) {
      // Find if the UUID exists in the ForgotPassword model
      return ForgotPassword.findOne({
        where: {
          UUID: uuid,
        },
      })
        .then((line) => {
          if (line) {
            return User.update(
              {
                password: hashedPassword,
              },
              {
                where: {
                  id: line.UserId,
                },
              }
            )
              .then((response) => {
                return ForgotPassword.destroy({
                  where: {
                    UUID: uuid,
                  },
                })
                  .then((response) => {
                    return User.findOne({
                      where: {
                        id: line.UserId,
                      },
                    })
                      .then((user) => {
                        emailController.sendEmailResetPasswordSuccess(
                          user,
                          templateResetPasswordSuccess.resetPasswordSuccess(
                            user
                          )
                        );

                        res.status(200).send({
                          message: "Your password has been successfully reset",
                          flag: "RESET_PASSWORD_SUCCESS",
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.status(400).json({
                          message: "There is an error with this request",
                          flag: "DB_ERROR",
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(400).json({
                      message: "There is an error with this request",
                      flag: "DB_ERROR",
                    });
                  });
              })
              .catch((error) => {
                console.log(error);
                res.status(400).json({
                  message: "There is an error with this request",
                  flag: "DB_ERROR",
                });
              });
          } else {
            res.status(400).json({ message: "This link is deprecated" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "There is an error with your request" });
        });
    } else {
      res.status(401).json({
        flag: "UNAUTHORIZED",
        message: "How did you do this API call?",
      });
    }
  },
};
