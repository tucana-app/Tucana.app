"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
        language: process.env.ADMIN_LANGUAGE,
        phoneNumber: process.env.ADMIN_PHONENUMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: process.env.MODO_FIRSTNAME,
        lastName: process.env.MODO_LASTNAME,
        username: process.env.MODO_USERNAME,
        email: process.env.MODO_EMAIL,
        password: bcrypt.hashSync(process.env.MODO_PASSWORD, 8),
        language: process.env.MODO_LANGUAGE,
        phoneNumber: process.env.MODO_PHONENUMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: {
        [Sequelize.Op.in]: [
          process.env.ADMIN_USERNAME,
          process.env.MODO_USERNAME,
        ],
      },
    });
  },
};
