"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("BookingStatuses", [
      {
        code: "pending",
        name: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "seen",
        name: "Seen by the driver",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "accepted",
        name: "Accepted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "refused",
        name: "Refused",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "canceled",
        name: "Canceled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BookingStatuses", null, {});
  },
};
