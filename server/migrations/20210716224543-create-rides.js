"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      driverId: {
        type: Sequelize.INTEGER,
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
      statusRideId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      seatsAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Rides");
  },
};
