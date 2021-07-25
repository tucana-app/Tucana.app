const db = require("../models");
const Ride = db.Ride;
const RideStatus = db.RideStatus;
const User = db.User;
const Driver = db.Driver;
const Bookings = db.Bookings;
const BookingStatus = db.BookingStatus;
const Conversation = db.Conversation;
const Messages = db.Messages;
const MessageStatus = db.MessageStatus;
const Op = db.Sequelize.Op;
require("dotenv").config;

const { v4: uuidv4 } = require("uuid");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getAllUserMessages(req, res) {
    return Conversation.findAll({
      where: {
        [Op.or]: [
          // Look for one of the combinaise for driver/user
          { DriverId: req.query.userId },
          { UserId: req.query.userId },
        ],
      },
      include: [
        {
          model: Messages,
          include: [
            {
              model: MessageStatus,
            },
          ],
        },
        {
          model: Driver,
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  "email",
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
          model: User,
          attributes: {
            exclude: [
              "email",
              "biography",
              "password",
              "phoneNumber",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    })
      .then((conversations) => {
        res.status(200).json(conversations);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json({
          errorMessage,
          errorCode: 1,
        });
      });
  },

  startConversation(req, res) {
    const { driverId, userId, rideId, bookingId } = req.body;

    return Conversation.findOne({
      where: {
        [Op.or]: [
          // Look for one of the combinaise for driver/user
          { [Op.and]: [{ DriverId: driverId }, { UserId: userId }] },
          { [Op.and]: [{ DriverId: userId }, { UserId: driverId }] },
        ],
      },
    })
      .then((conversation) => {
        // Conversation found
        if (conversation) {
          Messages.findAndCountAll({
            where: {
              ConversationId: conversation.id,
            },
          })
            .then((messages) => {
              // console.log(conversation);
              res.status(200).json({ conversation, messages });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(200).json("Conversation does not exist");
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json({
          errorMessage,
          errorCode: 1,
        });
      });
  },
};
