"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class emailReminderRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      emailReminderRating.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });
      emailReminderRating.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });
      emailReminderRating.belongsTo(models.Bookings, {
        onDelete: "NO ACTION",
      });
    }
  }
  emailReminderRating.init(
    {
      UserId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
      BookingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "emailReminderRating",
    }
  );
  return emailReminderRating;
};
