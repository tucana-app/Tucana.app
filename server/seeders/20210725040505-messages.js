"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      {
        SenderId: 1,
        ReceiverId: 2,
        body: "Test",
        ConversationId: 1,
        MessageStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Messages", {});
  },
};
