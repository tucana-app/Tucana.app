"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("MessageStatuses", [
      {
        code: "sent",
        name: "Sent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "received",
        name: "Received",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "seen",
        name: "Seen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MessageStatuses", {});
  },
};
