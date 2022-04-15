"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      // Booking #1
      {
        DriverId: 4,
        UserId: 2,
        RideId: 6,
        seatsBooked: 1,
        BookingStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #2
      {
        DriverId: 1,
        UserId: 3,
        RideId: 4,
        seatsBooked: 2,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #3
      {
        DriverId: 2,
        UserId: 1,
        RideId: 9,
        seatsBooked: 3,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #4
      {
        DriverId: 3,
        UserId: 1,
        RideId: 8,
        seatsBooked: 3,
        BookingStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #5
      {
        DriverId: 3,
        UserId: 4,
        RideId: 1,
        seatsBooked: 1,
        BookingStatusId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #6
      {
        DriverId: 2,
        UserId: 4,
        RideId: 5,
        seatsBooked: 2,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #7
      {
        DriverId: 2,
        UserId: 1,
        RideId: 7,
        seatsBooked: 1,
        BookingStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #8
      {
        DriverId: 4,
        UserId: 3,
        RideId: 2,
        seatsBooked: 5,
        BookingStatusId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #9
      {
        DriverId: 4,
        UserId: 3,
        RideId: 6,
        seatsBooked: 1,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #10
      {
        DriverId: 1,
        UserId: 2,
        RideId: 3,
        seatsBooked: 2,
        BookingStatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #11
      {
        DriverId: 2,
        UserId: 1,
        RideId: 5,
        seatsBooked: 2,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Booking #12
      {
        DriverId: 3,
        UserId: 2,
        RideId: 1,
        seatsBooked: 1,
        BookingStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    });
  },
};
