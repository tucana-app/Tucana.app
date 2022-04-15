"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PassengerRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PassengerRating.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      PassengerRating.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });

      PassengerRating.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });

      PassengerRating.belongsTo(models.Bookings, {
        onDelete: "NO ACTION",
      });
    }
  }
  PassengerRating.init(
    {
      UserId: DataTypes.INTEGER,
      DriverId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
      BookingId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PassengerRating",
    }
  );
  return PassengerRating;
};
