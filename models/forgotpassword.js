"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForgotPassword.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });
    }
  }
  ForgotPassword.init(
    {
      UserId: DataTypes.INTEGER,
      UUID: DataTypes.UUID,
      attempts: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ForgotPassword",
    }
  );
  return ForgotPassword;
};
