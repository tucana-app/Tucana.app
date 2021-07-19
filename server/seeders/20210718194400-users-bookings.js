"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_bookings", [
      {
        // UserId: 1 = Administrator
        UserId: 1,
        BookingId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        BookingId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        BookingId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_bookings", {
      UserId: {
        // UserId: 1 = Benny
        // UserId: 2 = Axelma
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
