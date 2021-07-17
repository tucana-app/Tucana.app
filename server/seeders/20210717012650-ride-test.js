"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rides", [
      {
        driverId: 1,
        cityOrigin: "Sámara",
        provinceOrigin: "Guanacaste",
        cityDestination: "San Salvador",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 2,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        driverId: 1,
        cityOrigin: "San Salvador",
        provinceOrigin: "Guanacaste",
        cityDestination: "Sámara",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 4,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Rides", null, {});
  },
};
