"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Benjamin",
        lastName: "Jaume",
        username: "benny",
        email: "benjamin.jaume@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50687907001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Axel",
        lastName: "Martin",
        username: "axelma",
        email: "axe@martin.ba",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50612367001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: "benny",
      username: "axelma",
    });
  },
};
