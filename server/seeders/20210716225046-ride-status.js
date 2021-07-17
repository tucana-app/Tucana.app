"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RideStatuses", [
      {
        code: "created",
        name: "Created",
      },
      {
        code: "accepted",
        name: "Accepted",
      },
      {
        code: "planned",
        name: "Planned",
      },
      {
        code: "on_going",
        name: "On going",
      },
      {
        code: "done",
        name: "Done",
      },
      {
        code: "rated",
        name: "Rated",
      },
      {
        code: "canceled",
        name: "Canceled",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RideStatuses", null, {});
  },
};
