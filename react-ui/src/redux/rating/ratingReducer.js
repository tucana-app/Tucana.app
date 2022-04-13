import ratingTypes from "./ratingTypes";

const initialState = {
  isLoadingGetRatingsReceivedPassenger: false,
  getRatingsReceivedPassengerData: [],
  getRatingsReceivedPassengerFail: "",

  isLoadingGetRatingsGivenPassenger: false,
  getRatingsGivenPassengerData: [],
  getRatingsGivenPassengerFail: "",

  isLoadingGetRatingsReceivedDriver: false,
  getRatingsReceivedDriverData: [],
  getRatingsReceivedDriverFail: "",

  isLoadingGetRatingsGivenDriver: false,
  getRatingsGivenDriverData: [],
  getRatingsGivenDriverFail: "",
};

function ratingReducer(state = initialState, action) {
  switch (action.type) {
    // Get passenger's ratings received
    case ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: true,
      };

    case ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: false,
        getRatingsReceivedPassengerData: action.payload,
        getRatingsReceivedPassengerFail: "",
      };

    case ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: false,
        getRatingsReceivedPassengerData: [],
        getRatingsReceivedPassengerFail: action.payload,
      };

    // Get passenger's ratings given
    case ratingTypes.GET_RATINGS_GIVEN_PASSENGER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: true,
      };

    case ratingTypes.GET_RATINGS_GIVEN_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: false,
        getRatingsReceivedPassengerData: action.payload,
        getRatingsReceivedPassengerFail: "",
      };

    case ratingTypes.GET_RATINGS_GIVEN_PASSENGER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsReceivedPassenger: false,
        getRatingsReceivedPassengerData: [],
        getRatingsReceivedPassengerFail: action.payload,
      };

    // Get driver's ratings received
    case ratingTypes.GET_RATINGS_RECEIVED_DRIVER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsReceivedDriver: true,
      };

    case ratingTypes.GET_RATINGS_RECEIVED_DRIVER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsReceivedDriver: false,
        getRatingsReceivedDriverData: action.payload,
        getRatingsReceivedDriverFail: "",
      };

    case ratingTypes.GET_RATINGS_RECEIVED_DRIVER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsReceivedDriver: false,
        getRatingsReceivedDriverData: [],
        getRatingsReceivedDriverFail: action.payload,
      };

    // Get driver's ratings given
    case ratingTypes.GET_RATINGS_GIVEN_DRIVER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsGivenDriver: true,
      };

    case ratingTypes.GET_RATINGS_GIVEN_DRIVER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsGivenDriver: false,
        getRatingsGivenDriverData: action.payload,
        getRatingsGivenDriverFail: "",
      };

    case ratingTypes.GET_RATINGS_GIVEN_DRIVER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsGivenDriver: false,
        getRatingsGivenDriverData: [],
        getRatingsGivenDriverFail: action.payload,
      };

    // Get user's driver ratings

    // case ratingTypes.GET_USER_RATINGS_DRIVER_REQUEST:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsDriver: true,
    //   };

    // case ratingTypes.GET_USER_RATINGS_DRIVER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsDriver: false,
    //     getUserRatingsDriverData: action.payload,
    //     getUserRatingsDriverFail: "",
    //   };

    // case ratingTypes.GET_USER_RATINGS_DRIVER_FAIL:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsDriver: false,
    //     getUserRatingsDriverData: [],
    //     getUserRatingsDriverFail: action.payload,
    //   };

    // // Get user's ratings to be done

    // case ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_REQUEST:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsToDoPassenger: true,
    //   };

    // case ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsToDoPassenger: false,
    //     getUserRatingsToDoPassengerData: action.payload,
    //     getUserRatingsToDoPassengerFail: "",
    //   };

    // case ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_FAIL:
    //   return {
    //     ...state,
    //     isLoadingGetUserRatingsToDoPassenger: false,
    //     getUserRatingsToDoPassengerData: [],
    //     getUserRatingsToDoPassengerFail: action.payload,
    //   };

    default:
      return state;
  }
}

export default ratingReducer;
