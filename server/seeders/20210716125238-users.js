"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Benjamin",
        lastName: "Jaume",
        username: "ben",
        email: "ride.cr.app@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50687907001",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Axel",
        lastName: "Freeman",
        username: "freeman",
        email: "axel@freeman.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "0605040302",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Flora",
        lastName: "Marketing",
        username: "flora",
        email: "flora@marketing.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "0807060504",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Pascal",
        lastName: "Atenas",
        username: "pascal",
        email: "pascal@atenas.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "87956231",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: "ben",
      username: "freeman",
      username: "flora",
      username: "pascal",
    });
  },
};
