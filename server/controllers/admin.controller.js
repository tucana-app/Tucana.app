const db = require("../models");
const User = db.User;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  listUsers(req, res) {
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
};
