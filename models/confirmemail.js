"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConfirmEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ConfirmEmail.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });
    }
  }
  ConfirmEmail.init(
    {
      UserId: DataTypes.INTEGER,
      UUID: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ConfirmEmail",
    }
  );
  return ConfirmEmail;
};
