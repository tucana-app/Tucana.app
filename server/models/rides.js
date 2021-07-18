"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rides.belongsToMany(models.User, {
        through: "users_rides",
        onDelete: "CASCADE",
      });

      Rides.belongsTo(models.RideStatus, {
        onDelete: "NO ACTION",
      });
    }
  }
  Rides.init(
    {
      cityOrigin: DataTypes.STRING,
      provinceOrigin: DataTypes.STRING,
      cityDestination: DataTypes.STRING,
      provinceDestination: DataTypes.STRING,
      dateTime: DataTypes.DATE,
      seatsAvailable: DataTypes.INTEGER,
      seatsLeft: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      RideStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rides",
    }
  );
  return Rides;
};
