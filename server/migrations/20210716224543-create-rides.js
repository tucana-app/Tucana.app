"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      DriverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      cityOrigin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provinceOrigin: {
        type: Sequelize.STRING,
      },
      cityDestination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provinceDestination: {
        type: Sequelize.STRING,
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      seatsAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seatsLeft: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      RideStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    await queryInterface.dropTable("Rides");
  },
};
