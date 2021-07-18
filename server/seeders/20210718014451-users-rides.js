"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_rides", [
      {
        // UserId: 1 = Administrator
        UserId: 1,
        RideId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RideId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RideId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // UserId: 2 = Moderator
        UserId: 2,
        RideId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        RideId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RideId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_rides", {
      UserId: {
        // UserId: 1 = Benny
        // UserId: 2 = Axelma
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
