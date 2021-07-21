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
        email: "ben@jam.in",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50687907001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Robert",
        lastName: "Dufor",
        username: "dufor",
        email: "rober@dufor.ca",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50612367001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sarah",
        lastName: "Connor",
        username: "sarah",
        email: "sara@croc.he",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50611257001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Julien",
        lastName: "Paquet",
        username: "julien",
        email: "riri@fifi.nz",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50656237001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: "benny",
      username: "dufor",
      username: "sarah",
      username: "julien",
    });
  },
};
