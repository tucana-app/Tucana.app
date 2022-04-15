"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Drivers", [
      {
        UserId: 1,
        verified: true,
        AdminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        verified: true,
        AdminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        verified: true,
        AdminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        verified: true,
        AdminId: 1,
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
