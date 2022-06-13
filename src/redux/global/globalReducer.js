import globalTypes from "./globalTypes";

const initialState = {
  seatsMax: 6,

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

  priceMin: 500,
  priceMax: 50000,

  isLoadingCountries: false,
  countries: [],
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

    // Get all countries info

    case globalTypes.GET_COUNTRIES_REQUEST:
      return {
        ...state,
        isLoadingCountries: true,
      };

    case globalTypes.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoadingCountries: false,
        countries: action.payload,
      };

    default:
      return state;
  }
}

export default globalReducer;
