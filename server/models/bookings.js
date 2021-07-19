"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookings.belongsToMany(models.User, {
        through: "users_bookings",
        onDelete: "NO ACTION",
      });

      Bookings.belongsTo(models.Rides, {
        onDelete: "NO ACTION",
      });

      Bookings.belongsTo(models.BookingStatus, {
        onDelete: "NO ACTION",
      });
    }
  }
  Bookings.init(
    {
      RideId: DataTypes.INTEGER,
      BookingStatusId: DataTypes.INTEGER,
      seatsBooked: DataTypes.INTEGER,
      commentPassenger: DataTypes.STRING,
      commentRefused: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookings",
    }
  );
  return Bookings;
};
