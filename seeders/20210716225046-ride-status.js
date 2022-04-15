"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RideStatuses", [
      {
        code: "planned",
        name: "Planned",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "on_going",
        name: "On going",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "done",
        name: "Done",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "canceled",
        name: "Canceled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RideStatuses", null, {});
  },
};
