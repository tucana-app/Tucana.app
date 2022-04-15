"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DriverRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DriverRating.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      DriverRating.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });

      DriverRating.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });

      DriverRating.belongsTo(models.Bookings, {
        onDelete: "NO ACTION",
      });
    }
  }
  DriverRating.init(
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
      modelName: "DriverRating",
    }
  );
  return DriverRating;
};
