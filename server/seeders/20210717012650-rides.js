"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rides", [
      // Ride #1
      {
        DriverId: 3,
        cityOrigin: "Samara",
        provinceOrigin: "Guanacaste",
        cityDestination: "San Salvador",
        provinceDestination: "San José",
        dateTime: new Date(new Date().setDate(new Date().getDate() - 5)),
        seatsAvailable: 2,
        seatsLeft: 2,
        comment: "Passing by Ruta 27 and San Jose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #2
      {
        DriverId: 4,
        cityOrigin: "Limon",
        provinceOrigin: "Limón",
        cityDestination: "Puerto Viejo",
        provinceDestination: "Puntarenas",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 15)),
        seatsAvailable: 6,
        seatsLeft: 6,
        comment: "Diamante valley",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #3
      {
        DriverId: 1,
        cityOrigin: "Uvita",
        provinceOrigin: "San José",
        cityDestination: "San Salvador",
        provinceDestination: "Guanacaste",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 2)),
        seatsAvailable: 3,
        seatsLeft: 1,
        comment: "Excited to meet you on my way!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #4
      {
        DriverId: 1,
        cityOrigin: "Dominical",
        provinceOrigin: "Puntarenas",
        cityDestination: "Nosara",
        provinceDestination: "Límon",
        dateTime: new Date(new Date().setDate(new Date().getDate() - 8)),
        seatsAvailable: 4,
        seatsLeft: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #5
      {
        DriverId: 2,
        cityOrigin: "Tamarindo",
        provinceOrigin: "Guanacaste",
        cityDestination: "Liberia",
        provinceDestination: "San José",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 3)),
        seatsAvailable: 5,
        seatsLeft: 5,
        comment: "I have a lot of seats available if you need",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #6
      {
        DriverId: 4,
        cityOrigin: "San Cristobal",
        provinceOrigin: "San José",
        cityDestination: "Carillo",
        provinceDestination: "Guanacaste",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 16)),
        seatsAvailable: 1,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #7
      {
        DriverId: 2,
        cityOrigin: "Tarcol",
        provinceOrigin: "Cartago",
        cityDestination: "Santa Teresa",
        provinceDestination: "Guanacaste",
        dateTime: new Date(new Date().setDate(new Date().getDate() - 4)),
        seatsAvailable: 1,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #8
      {
        DriverId: 3,
        cityOrigin: "Jaco",
        provinceOrigin: "Cartago",
        cityDestination: "Orotina",
        provinceDestination: "Heredia",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        seatsAvailable: 3,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #9
      {
        DriverId: 2,
        cityOrigin: "Guanabana",
        provinceOrigin: "Alajuela",
        cityDestination: "Santo Domingo",
        provinceDestination: "Puntarenas",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 6)),
        seatsAvailable: 5,
        seatsLeft: 5,
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
