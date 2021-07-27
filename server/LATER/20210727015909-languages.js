"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Languages", [
      {
        code: "EN",
        name: "English",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ES",
        name: "Español",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "FR",
        name: "Français",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Languages", {});
  },
};
