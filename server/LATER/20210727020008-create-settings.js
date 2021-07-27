'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      notificationEmail: {
        type: Sequelize.BOOLEAN
      },
      notificationPush: {
        type: Sequelize.BOOLEAN
      },
      notificationSMS: {
        type: Sequelize.BOOLEAN
      },
      language: {
        type: Sequelize.STRING
      },
      animal: {
        type: Sequelize.STRING
      },
      cigarette: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Settings');
  }
};