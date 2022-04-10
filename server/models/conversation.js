"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });

      Conversation.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      Conversation.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });

      Conversation.belongsTo(models.Bookings, {
        onDelete: "NO ACTION",
      });

      Conversation.hasMany(models.Message, {
        onDelete: "NO ACTION",
      });
    }
  }
  Conversation.init(
    {
      DriverId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
      BookingId: DataTypes.INTEGER,
      archived: DataTypes.BOOLEAN,
      UUID: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
