"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "SenderId",
        onDelete: "NO ACTION",
      });

      Message.belongsTo(models.Conversation, {
        onDelete: "NO ACTION",
      });

      Message.belongsTo(models.MessageStatus, {
        onDelete: "NO ACTION",
      });
    }
  }
  Message.init(
    {
      SenderId: DataTypes.INTEGER,
      ReceiverId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      ConversationId: DataTypes.INTEGER,
      MessageStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
