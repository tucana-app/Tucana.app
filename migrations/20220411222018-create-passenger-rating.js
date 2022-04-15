"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PassengerRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      DriverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      RideId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      BookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PassengerRatings");
  },
};
