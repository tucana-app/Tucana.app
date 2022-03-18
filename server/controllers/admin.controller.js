const db = require("../models");
const User = db.User;
const Conversation = db.Conversation;
const Driver = db.Driver;
const Ride = db.Ride;

const errorMessage = { message: "A problem occured with this request" };

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

  adminUsersConversations(req, res) {
    return Conversation.findAll({
      include: [
        {
          model: Driver,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: Ride,
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
};
