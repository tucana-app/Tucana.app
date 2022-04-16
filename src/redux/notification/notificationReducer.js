import notificationTypes from "./notificationTypes";

const initialState = {
  isLoadingDriverNewRidesRequests: false,
  driverNewRidesRequestsData: [],
  driverNewRidesRequestsError: "",

  isLoadingPassengerBookingsResponses: false,
  passengerBookingsResponsesData: [],
  passengerBookingsResponsesError: "",
};

const notificationeReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_REQUEST:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: true,
      };

    case notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: false,
        driverNewRidesRequestsData: action.payload,
        driverNewRidesRequestsError: "",
      };

    case notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_FAIL:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: false,
        driverNewRidesRequestsData: [],
        driverNewRidesRequestsError: action.payload,
      };

    case notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_REQUEST:
      return {
        ...state,
        isLoadingPassengerBookingsResponses: true,
      };

    case notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_SUCCESS:
      return {
        ...state,
        isLoadingPassengerBookingsResponses: false,
        passengerBookingsResponsesData: action.payload,
        passengerBookingsResponsesError: "",
      };

    case notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_FAIL:
      return {
        ...state,
        isLoadingPassengerBookingsResponses: false,
        passengerBookingsResponsesData: [],
        passengerBookingsResponsesError: action.payload,
      };

    case notificationTypes.RESET_NOTIFICATIONS:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: false,
        driverNewRidesRequestsData: [],
        driverNewRidesRequestsError: action.payload,

        isLoadingPassengerBookingsResponses: false,
        passengerBookingsResponsesData: [],
        passengerBookingsResponsesError: "",
      };

    default:
      return state;
  }
};

export default notificationeReducer;
