import messageTypes from "./messageTypes";

const initialState = {
  isLoadingDriverNewRidesRequests: false,
  driverNewRidesRequestsData: {},
  driverNewRidesRequestsError: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_REQUEST:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: true,
      };

    case messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: false,
        driverNewRidesRequestsData: action.payload,
        driverNewRidesRequestsError: "",
      };

    case messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_FAIL:
      return {
        ...state,
        isLoadingDriverNewRidesRequests: false,
        driverNewRidesRequestsData: [],
        driverNewRidesRequestsError: action.payload,
      };

    default:
      return state;
  }
};

export default messageReducer;
