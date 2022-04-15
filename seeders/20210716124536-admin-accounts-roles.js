"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("admins_roles", [
      {
        // adminId: 1 = Administrator
        adminId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        adminId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        adminId: 1,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        adminId: 1,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // adminId: 2 = Moderator
        adminId: 2,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // adminId: 3 = Support
        adminId: 3,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // adminId: 4 = Sales
        adminId: 4,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("admins_roles", {
      adminId: {
        // adminId: 1 = Administrator
        // adminId: 2 = Moderator
        // adminId: 3 = Support
        // adminId: 4 = Sales
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
