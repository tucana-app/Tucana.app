"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      Driver.hasMany(models.Ride, {
        onDelete: "NO ACTION",
      });

      Driver.hasMany(models.Conversation, {
        onDelete: "NO ACTION",
      });

      Driver.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });
    }
  }
  Driver.init(
    {
      UserId: DataTypes.INTEGER,
      AdminId: DataTypes.BOOLEAN,
      verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  return Driver;
};
