"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SenderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ReceiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ConversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MessageStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Messages");
  },
};
