"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DriverRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PassengerId: {
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
      PassengerRatingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      AdminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("DriverRatings");
  },
};
