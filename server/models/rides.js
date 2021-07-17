"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Rides.init(
    {
      driverId: DataTypes.INTEGER,
      cityOrigin: DataTypes.STRING,
      provinceOrigin: DataTypes.STRING,
      cityDestination: DataTypes.STRING,
      provinceDestination: DataTypes.STRING,
      statusRideId: DataTypes.STRING,
      date: DataTypes.DATE,
      seatsAvailable: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rides",
    }
  );
  return Rides;
};
