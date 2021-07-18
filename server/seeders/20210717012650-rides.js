"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rides", [
      {
        cityOrigin: "Sámara",
        provinceOrigin: "Guanacaste",
        cityDestination: "San Salvador",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 2,
        seatsLeft: 2,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cityOrigin: "San Salvador",
        provinceOrigin: "Guanacaste",
        cityDestination: "Sámara",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 4,
        seatsLeft: 4,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cityOrigin: "Uvita",
        provinceOrigin: "San José",
        cityDestination: "San Salvador",
        provinceDestination: "Guanacaste",
        dateTime: new Date(),
        seatsAvailable: 4,
        seatsLeft: 4,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cityOrigin: "Dominical",
        provinceOrigin: "Puntarenas",
        cityDestination: "Puerto Viejo",
        provinceDestination: "Límon",
        dateTime: new Date(),
        seatsAvailable: 4,
        seatsLeft: 4,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cityOrigin: "San Salvador",
        provinceOrigin: "Guanacaste",
        cityDestination: "Sámara",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 4,
        seatsLeft: 4,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cityOrigin: "Samara",
        provinceOrigin: "Guanacaste",
        cityDestination: "Dominical",
        provinceDestination: "San José",
        dateTime: new Date(),
        seatsAvailable: 1,
        seatsLeft: 0,
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
