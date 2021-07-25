"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Conversations", [
      {
        DriverId: 1,
        UserId: 3,
        RideId: 8,
        BookingId: 4,
        archived: false,
        UUID: uuidv4(),
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 4,
        UserId: 2,
        RideId: 6,
        BookingId: 1,
        archived: false,
        UUID: uuidv4(),
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
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
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Conversations", {});
  },
};
