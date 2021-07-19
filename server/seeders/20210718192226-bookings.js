"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      {
        RideId: 2,
        seatsBooked: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        RideId: 4,
        seatsBooked: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        RideId: 1,
        seatsBooked: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", {
      UserId: {
        // UserId: 1 = Benny
        // UserId: 2 = Axelma
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
