"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "moderator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "support",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sales",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
