import adminTypes from "./adminTypes";

const initialState = {
  isLoadingUsers: false,
  usersData: [],
  usersError: "",

  isLoadingRides: false,
  ridesData: [],
  ridesError: "",

  isLoadingSingleRide: false,
  singleRideData: [],
  singleRideError: "",

  isLoadingSingleRideAllBookings: false,
  singleRideAllBookingsData: [],
  singleRideAllBookingsError: "",

  isLoadingSendTestEmail: false,
  sendTestEmailData: [],
  sendTestEmailError: "",

  isLoadingPassengersRatings: false,
  passengersRatingsData: [],
  passengersRatingsError: "",

  isLoadingDriversRatings: false,
  driversRatingsData: [],
  driversRatingsError: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.ADMIN_GET_USERS_REQUEST:
      return {
        ...state,
        isLoadingUsers: true,
      };

    case adminTypes.ADMIN_GET_USERS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: action.payload,
        usersError: "",
      };

    case adminTypes.ADMIN_GET_USERS_FAIL:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: [],
        usersError: action.payload,
      };

    case adminTypes.ADMIN_GET_RIDES_REQUEST:
      return {
        ...state,
        isLoadingRides: true,
      };

    case adminTypes.ADMIN_GET_RIDES_SUCCESS:
      return {
        ...state,
        isLoadingRides: false,
        ridesData: action.payload,
        ridesError: "",
      };

    case adminTypes.ADMIN_GET_RIDES_FAIL:
      return {
        ...state,
        isLoadingRides: false,
        ridesData: [],
        ridesError: action.payload,
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_REQUEST:
      return {
        ...state,
        isLoadingSingleRide: true,
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_SUCCESS:
      return {
        ...state,
        isLoadingSingleRide: false,
        singleRideData: action.payload,
        singleRideError: "",
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_FAIL:
      return {
        ...state,
        isLoadingSingleRide: false,
        singleRideData: [],
        singleRideError: action.payload,
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoadingSingleRideAllBookings: true,
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoadingSingleRideAllBookings: false,
        singleRideAllBookingsData: action.payload,
        singleRideAllBookingsError: "",
      };

    case adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_FAIL:
      return {
        ...state,
        isLoadingSingleRideAllBookings: false,
        singleRideAllBookingsData: [],
        singleRideAllBookingsError: action.payload,
      };

    case adminTypes.ADMIN_SEND_TEST_EMAIL_REQUEST:
      return {
        ...state,
        isLoadingSendTestEmail: true,
      };

    case adminTypes.ADMIN_SEND_TEST_EMAIL_SUCCESS:
      return {
        ...state,
        isLoadingSendTestEmail: false,
        sendTestEmailData: action.payload,
        sendTestEmailError: "",
      };

    case adminTypes.ADMIN_SEND_TEST_EMAIL_FAIL:
      return {
        ...state,
        isLoadingSendTestEmail: false,
        sendTestEmailData: [],
        sendTestEmailError: action.payload,
      };

    case adminTypes.ADMIN_GET_PASSENGERS_RATINGS_REQUEST:
      return {
        ...state,
        isLoadingPassengersRatings: true,
      };

    case adminTypes.ADMIN_GET_PASSENGERS_RATINGS_SUCCESS:
      return {
        ...state,
        isLoadingPassengersRatings: false,
        passengersRatingsData: action.payload,
        passengersRatingsError: "",
      };

    case adminTypes.ADMIN_GET_PASSENGERS_RATINGS_FAIL:
      return {
        ...state,
        isLoadingPassengersRatings: false,
        passengersRatingsData: [],
        passengersRatingsError: action.payload,
      };

    case adminTypes.ADMIN_GET_DRIVERS_RATINGS_REQUEST:
      return {
        ...state,
        isLoadingDriversRatings: true,
      };

    case adminTypes.ADMIN_GET_DRIVERS_RATINGS_SUCCESS:
      return {
        ...state,
        isLoadingDriversRatings: false,
        driversRatingsData: action.payload,
        driversRatingsError: "",
      };

    case adminTypes.ADMIN_GET_DRIVERS_RATINGS_FAIL:
      return {
        ...state,
        isLoadingDriversRatings: false,
        driversRatingsData: [],
        driversRatingsError: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
