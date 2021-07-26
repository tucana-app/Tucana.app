"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.User, {
        foreignKey: "SenderId",
        onDelete: "NO ACTION",
      });

      Messages.belongsTo(models.Conversation, {
        onDelete: "NO ACTION",
      });

      Messages.belongsTo(models.MessageStatus, {
        onDelete: "NO ACTION",
      });
    }
  }
  Messages.init(
    {
      SenderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      ConversationId: DataTypes.INTEGER,
      MessageStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
