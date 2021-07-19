"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      RideId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      BookingStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      seatsBooked: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commentPassenger: {
        type: Sequelize.STRING,
      },
      commentRefused: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
