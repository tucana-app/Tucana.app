"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Valentin",
        lastName: "Palmer",
        username: "val",
        email: "ride.cr.app@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "+50625213256",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Damien",
        lastName: "Roufre",
        username: "damien",
        email: "benjamin.jaume@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "0605040302",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Peter",
        lastName: "Furniture",
        username: "peter",
        email: "jorustyron@outlook.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 8),
        phoneNumber: "0807060504",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        confirmEmailUUID: uuidv4(),
      },
      {
        firstName: "Alan",
        lastName: "Matera",
        username: "alan",
        email: "jorustyron@gmail.com",
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
      username: "val",
      username: "damien",
      username: "peter",
      username: "alan",
    });
  },
};
