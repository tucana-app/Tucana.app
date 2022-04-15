var nodemailer = require("nodemailer");
require("dotenv").config;

const db = require("../models");
const Admin = db.Admin;
const User = db.User;
const Ride = db.Ride;
const Driver = db.Driver;
const RideStatus = db.RideStatus;
const Bookings = db.Bookings;
const BookingStatus = db.BookingStatus;
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const admin_VerifPassengerRating = db.admin_VerifPassengerRating;
const admin_VerifDriverRating = db.admin_VerifDriverRating;

const errorMessage = { message: "A problem occured with this request" };

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
  adminListUsers(req, res) {
    return User.findAll()
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  adminListRides(req, res) {
    return Ride.findAll({
      order: [["dateTime", "DESC"]],
      include: [
        {
          model: Driver,
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  "biography",
                  "password",
                  "phoneNumber",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        },
        {
          model: RideStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  adminSingleRide(req, res) {
    return Ride.findOne({
      where: {
        id: req.query.rideId,
      },
      include: [
        {
          model: Driver,
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  "biography",
                  "password",
                  "phoneNumber",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        },
        {
          model: RideStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  adminSingleRideAllBookings(req, res) {
    return Bookings.findAll({
      where: {
        RideId: req.query.rideId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "biography",
              "password",
              "phoneNumber",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  adminSendTestEmail(req, res) {
    var mailOptions = {
      from: `Ride.CR <${process.env.EMAIL_ADDRESS}>`,
      to: `${req.query.email}`,
      subject: "Test email",
      text: "Hi. This is an email sent from the admin panel of Ride.CR | Please do not answer back to this email",
      html: "Hi. This is an email sent from the admin panel of Ride.CR | Please do not answer back to this email",
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

  getPassengersRatings(req, res) {
    let ratingsPassenger = [];

    (async function () {
      let ratings = await PassengerRating.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "biography",
                "password",
                "phoneNumber",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: Ride,
          },
          {
            model: Bookings,
          },
          {
            model: Driver,
            include: [
              {
                model: User,
                attributes: {
                  exclude: [
                    "biography",
                    "password",
                    "phoneNumber",
                    "createdAt",
                    "updatedAt",
                  ],
                },
              },
            ],
          },
        ],
      });

      if (ratings.length !== 0) {
        await Promise.all(
          ratings.map((rating) => {
            return admin_VerifPassengerRating
              .findOne({
                where: {
                  PassengerRatingId: rating.id,
                },
                include: [
                  {
                    model: Admin,
                  },
                ],
              })
              .then((verif) => {
                ratingsPassenger.push({ rating, AdminVerif: verif });
              });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsPassenger);
      } else {
        res.status(200).json(ratingsPassenger);
      }
    })();
  },

  getDriversRatings(req, res) {
    let ratingsDriver = [];

    (async function () {
      let ratings = await DriverRating.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "biography",
                "password",
                "phoneNumber",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: Ride,
          },
          {
            model: Bookings,
          },
          {
            model: Driver,
            include: [
              {
                model: User,
                attributes: {
                  exclude: [
                    "biography",
                    "password",
                    "phoneNumber",
                    "createdAt",
                    "updatedAt",
                  ],
                },
              },
            ],
          },
        ],
      });

      if (ratings.length !== 0) {
        await Promise.all(
          ratings.map((rating) => {
            return admin_VerifDriverRating
              .findOne({
                where: {
                  DriverRatingId: rating.id,
                },
                include: [
                  {
                    model: Admin,
                  },
                ],
              })
              .then((verif) => {
                ratingsDriver.push({ rating, AdminVerif: verif });
              });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsDriver);
      } else {
        res.status(200).json(ratingsDriver);
      }
    })();
  },
};
