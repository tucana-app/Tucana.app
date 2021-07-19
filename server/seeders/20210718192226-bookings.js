"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      {
        UserId: 1,
        RideId: 1,
        seatsBooked: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RideId: 3,
        seatsBooked: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        RideId: 4,
        seatsBooked: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", {
      UserId: {
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
