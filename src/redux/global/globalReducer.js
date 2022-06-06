import globalTypes from "./globalTypes";

const isDateInPast = (firstDate, secondDate) => {
  let first = new Date(firstDate);
  let second = new Date(secondDate);

  return first <= second;
  // return first.setHours(0, 0, 0, 0) <= second.setHours(0, 0, 0, 0);
};

const initialState = {
  seatsMax: 6,

  isEmptyObject: (obj) => {
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    return (
      obj && // 👈 null and undefined check
      Object.keys(obj).length === 0 &&
      obj.constructor === Object
    );
  },

  labelStringField: "You must enter a string",
  labelRequiredField: "This field is required",

  feedback: {},

  // Booking status
  // Status 1: Sent
  // Status 2: Seen
  // Status 3: Accepted
  // Status 4: Rejected
  // Status 5: Canceled
  bookingStatusVariant: (status) => {
    const variant = ["warning", "info", "success", "danger", "warning"];
    return variant[status - 1];
  },

  // Ride status
  // Status 1: Planned,
  // Status 2: On going,
  // Status 3: Done,
  // Status 4: Canceled,
  rideStatusVariant: (status) => {
    const variant = ["warning", "info", "success", "danger"];
    return variant[status - 1];
  },

  isDateInPast: isDateInPast,

  countDriverRides: (driverRidesData) => {
    let count = 0;

    driverRidesData.map((ride, index) => {
      return (ride.RideStatusId === 1 || ride.RideStatusId === 2) &&
        !isDateInPast(ride.dateTime, new Date())
        ? count++
        : null;
    });

    return count;
  },

  countDriverBookings: (driverBookingsData) => {
    let count = 0;

    driverBookingsData.map((booking, index) => {
      return booking.Ride.seatsLeft !== 0 &&
        booking.BookingStatusId === 1 &&
        !isDateInPast(booking.Ride.dateTime, new Date())
        ? count++
        : null;
    });

    return count;
  },

  // distanceLatLng: (mk1, mk2) => {
  //   var R = 3958.8; // Radius of the Earth in miles
  //   var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  //   var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  //   var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  //   var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  //   var d =
  //     2 *
  //     R *
  //     Math.asin(
  //       Math.sqrt(
  //         Math.sin(difflat / 2) * Math.sin(difflat / 2) +
  //           Math.cos(rlat1) *
  //             Math.cos(rlat2) *
  //             Math.sin(difflon / 2) *
  //             Math.sin(difflon / 2)
  //       )
  //     );
  //   return (d * 1.609344).toFixed(2);
  // },

  arrayContactSubjects: [
    "Account",
    "Booking",
    "Ride",
    "Investment",
    "Donation",
    "App feedback",
    "Report someone",
    "Work with us",
    "Request a feature",
    "Request my data",
    "Remove my account",
    "Other",
  ],
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_GLOBAL_STATE:
      return {
        ...state,
      };

    case globalTypes.SET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        variant: action.payload.variant,
      };

    case globalTypes.CLEAR_FEEDBACK:
      return { ...state, feedback: {} };

    default:
      return state;
  }
}

export default globalReducer;
