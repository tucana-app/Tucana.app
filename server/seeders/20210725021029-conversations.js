"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Conversations", [
      {
        DriverId: 4,
        UserId: 2,
        RideId: 6,
        BookingId: 1,
        archived: false,
        UUID: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 3,
        UserId: 2,
        RideId: 1,
        BookingId: 12,
        archived: false,
        UUID: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Conversations", {});
  },
};
