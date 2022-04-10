"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MessageStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MessageStatus.hasOne(models.Message);
    }
  }
  MessageStatus.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MessageStatus",
    }
  );
  return MessageStatus;
};
