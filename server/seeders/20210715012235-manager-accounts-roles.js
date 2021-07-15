"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_roles", [
      {
        // userId: 1 = Administrator
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // userId: 2 = Moderator
        userId: 2,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_roles", {
      userId: {
        // userId: 1 = Administrator
        // userId: 2 = Moderator
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
