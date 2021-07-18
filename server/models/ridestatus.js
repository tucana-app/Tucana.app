"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RideStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RideStatus.hasMany(models.Rides, {
        onDelete: "NO ACTION",
      });
    }
  }
  RideStatus.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RideStatus",
    }
  );
  return RideStatus;
};
