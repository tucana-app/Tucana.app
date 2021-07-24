"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Drivers", [
      {
        UserId: 1,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drivers", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
