"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_rides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_rides.belongsTo(models.User, {
        through: "users_rides",
      });
      users_rides.belongsTo(models.Rides, {
        through: "users_rides",
      });
    }
  }
  users_rides.init(
    {
      UserId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_rides",
    }
  );
  return users_rides;
};
