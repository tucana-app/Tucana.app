import globalTypes from "./globalTypes";

import crocodile from "../../assets/images/avatars/crocodile.jpg";
import dolphin from "../../assets/images/avatars/dolphin.jpg";
import iguana from "../../assets/images/avatars/iguana.jpg";
import jaguar from "../../assets/images/avatars/jaguar.jpg";
import macaw from "../../assets/images/avatars/macaw.jpg";
import monkey from "../../assets/images/avatars/monkey.jpg";
import sloth from "../../assets/images/avatars/sloth.jpg";
import toucan from "../../assets/images/avatars/toucan.jpg";
import turtle from "../../assets/images/avatars/turtle.jpg";
import whale from "../../assets/images/avatars/whale.jpg";
import none from "../../assets/images/avatars/default.svg";

import gold from "../../assets/images/filters/gold.png";
import selected from "../../assets/images/filters/filter-select.png";
import transparent from "../../assets/images/filters/transparent.png";

const initialState = {
  seatsMax: 3,

  labelStringField: "Only letters and numbers allowed",
  labelRequiredField: "This field is required",
  initHeight: 0,
  constants: [],

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
    "Close my account",
    "Other",
  ],

  priceMin: 2000,
  priceMax: 50000,

  isLoadingCountries: false,
  countries: [],

  isNavBar: true,

  commission: 1,

  carMakers: [
    "Other",
    "Audi",
    "BMW",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Daewoo",
    "Daihatsu",
    "Datsun",
    "Dodge",
    "Ford",
    "GMC",
    "Geely",
    "Honda",
    "Hyundai",
    "Jeep",
    "Kia",
    "Land Rover",
    "Mazda",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Peugeot",
    "Porsche",
    "RAM",
    "Renault",
    "Ssangyong",
    "Subaru",
    "Suzuki",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ],

  months: {
    1: "01-January",
    2: "02-February",
    3: "03-March",
    4: "04-April",
    5: "05-May",
    6: "06-June",
    7: "07-July",
    8: "08-August",
    9: "09-September",
    10: "10-October",
    11: "11-November",
    12: "12-December",
  },

  srcAvatar: (user) => {
    switch (user.avatar) {
      case "crocodile":
        return crocodile;

      case "dolphin":
        return dolphin;

      case "iguana":
        return iguana;

      case "jaguar":
        return jaguar;

      case "macaw":
        return macaw;

      case "monkey":
        return monkey;

      case "sloth":
        return sloth;

      case "toucan":
        return toucan;

      case "turtle":
        return turtle;

      case "whale":
        return whale;

      case null:
        return none;

      default:
        return none;
    }
  },

  srcFilter: (filter) => {
    switch (filter) {
      case "gold":
        return gold;

      case "selected":
        return selected;

      case null:
        return transparent;

      default:
        return transparent;
    }
  },
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_GLOBAL_STATE:
      return {
        ...state,
        initHeight: action.payload,
      };

    // Get constants

    case globalTypes.GET_CONSTANTS_REQUEST:
      return {
        ...state,
        isLoadingConstants: true,
      };

    case globalTypes.GET_CONSTANTS_SUCCESS:
      return {
        ...state,
        isLoadingConstants: false,
        constants: action.payload,
      };

    // OLD - Set alert module

    case globalTypes.SET_ALERT:
      return {
        ...state,
        feedback: action.payload,
        variant: action.payload.variant,
      };

    case globalTypes.CLEAR_ALERT:
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

    // Conditionally display the Navigation Bar
    case globalTypes.DISPLAY_NAV_BAR:
      return {
        ...state,
        isNavBar: action.payload,
      };

    default:
      return state;
  }
}

export default globalReducer;
