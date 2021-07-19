import messageTypes from "./messageTypes";

const initialState = {
  isLoadingRideRequests: false,
  userRidesRequestsData: [],
  userRidesRequestsError: "",

  isLoadingUserRidesRequests: false,
  userNewRidesRequestsData: {},
  userNewRidesRequestsError: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.GET_USER_RIDES_REQUESTS_REQUEST:
      return {
        ...state,
        isLoadingRideRequest: true,
      };

    case messageTypes.GET_USER_RIDES_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoadingRideRequest: false,
        userRidesRequestsData: action.payload,
        userRidesRequestsError: "",
      };

    case messageTypes.GET_USER_RIDES_REQUESTS_FAIL:
      return {
        ...state,
        isLoadingRideRequest: false,
        userRidesRequestsData: [],
        userRidesRequestsError: action.payload,
      };

    case messageTypes.GET_USER_NEW_RIDES_REQUESTS_REQUEST:
      return {
        ...state,
        isLoadingRideRequest: true,
      };

    case messageTypes.GET_USER_NEW_RIDES_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoadingRideRequest: false,
        userNewRidesRequestsData: action.payload,
        userNewRidesRequestsError: "",
      };

    case messageTypes.GET_USER_NEW_RIDES_REQUESTS_FAIL:
      return {
        ...state,
        isLoadingRideRequest: false,
        userNewRidesRequestsData: [],
        userNewRidesRequestsError: action.payload,
      };

    default:
      return state;
  }
};

export default messageReducer;
