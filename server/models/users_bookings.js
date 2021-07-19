"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_bookings.belongsTo(models.User, {
        through: "users_bookings",
      });
      users_bookings.belongsTo(models.Bookings, {
        through: "users_bookings",
      });
    }
  }
  users_bookings.init(
    {
      UserId: DataTypes.INTEGER,
      BookingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_bookings",
    }
  );
  return users_bookings;
};
