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

  isLoadingRatingToDo: false,
  ratingToDoData: {},
  ratingToDoError: "",

  isLoadingGetRatingsToDoPassenger: false,
  getRatingsToDoPassengerData: [],
  getRatingsToDoPassengerFail: "",

  isLoadingGetRatingsToDoDriver: false,
  getRatingsToDoDriverData: [],
  getRatingsToDoDriverFail: "",

  isLoadingSubmitRatingForm: false,
  submitRatingFormData: [],
  submitRatingFormFail: "",

  isLoadingSubmitPassengerRatingForm: false,
  submitPassengerRatingFormData: [],
  submitPassengerRatingFormFail: "",

  isLoadingSubmitDriverRatingForm: false,
  submitDriverRatingFormData: [],
  submitDriverRatingFormFail: "",

  isloadingDriverRatings: false,
  driverRatingsData: {},
  driverRatingsError: "",

  isloadingPassengerrRatings: false,
  passengerRatingsData: {},
  passengerRatingsError: "",
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
        isLoadingGetRatingsGivenPassenger: true,
      };

    case ratingTypes.GET_RATINGS_GIVEN_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsGivenPassenger: false,
        getRatingsGivenPassengerData: action.payload,
        getRatingsGivenPassengerFail: "",
      };

    case ratingTypes.GET_RATINGS_GIVEN_PASSENGER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsGivenPassenger: false,
        getRatingsGivenPassengerData: [],
        getRatingsGivenPassengerFail: action.payload,
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

    // Get a single rating to do
    case ratingTypes.GET_RATING_TO_DO_REQUEST:
      return {
        ...state,
        isLoadingRatingToDo: true,
      };

    case ratingTypes.GET_RATING_TO_DO_SUCCESS:
      return {
        ...state,
        isLoadingRatingToDo: false,
        ratingToDoData: action.payload,
        ratingToDoError: "",
      };

    case ratingTypes.GET_RATING_TO_DO_FAIL:
      return {
        ...state,
        isLoadingRatingToDo: false,
        ratingToDoData: [],
        ratingToDoError: action.payload,
      };

    // Get passenger's ratings to do
    case ratingTypes.GET_RATINGS_TO_DO_PASSENGER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsToDoPassenger: true,
      };

    case ratingTypes.GET_RATINGS_TO_DO_PASSENGER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsToDoPassenger: false,
        getRatingsToDoPassengerData: action.payload,
        getRatingsToDoPassengerFail: "",
      };

    case ratingTypes.GET_RATINGS_TO_DO_PASSENGER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsToDoPassenger: false,
        getRatingsToDoPassengerData: [],
        getRatingsToDoPassengerFail: action.payload,
      };

    // Get driver's ratings to do
    case ratingTypes.GET_RATINGS_TO_DO_DRIVER_REQUEST:
      return {
        ...state,
        isLoadingGetRatingsToDoDriver: true,
      };

    case ratingTypes.GET_RATINGS_TO_DO_DRIVER_SUCCESS:
      return {
        ...state,
        isLoadingGetRatingsToDoDriver: false,
        getRatingsToDoDriverData: action.payload,
        getRatingsToDoDriverFail: "",
      };

    case ratingTypes.GET_RATINGS_TO_DO_DRIVER_FAIL:
      return {
        ...state,
        isLoadingGetRatingsToDoDriver: false,
        getRatingsToDoDriverData: [],
        getRatingsToDoDriverFail: action.payload,
      };

    // Submit a rating's form
    case ratingTypes.SUBMIT_RATING_FORM_REQUEST:
      return {
        ...state,
        isLoadingSubmitRatingForm: true,
      };

    case ratingTypes.SUBMIT_RATING_FORM_SUCCESS:
      return {
        ...state,
        isLoadingSubmitRatingForm: false,
        submitRatingFormData: action.payload,
        submitRatingFormFail: "",
      };

    case ratingTypes.SUBMIT_RATING_FORM_FAIL:
      return {
        ...state,
        isLoadingSubmitRatingForm: false,
        submitRatingFormData: [],
        submitRatingFormFail: action.payload,
      };

    // Submit the passenger rating's form
    case ratingTypes.SUBMIT_PASSENGER_RATING_FORM_REQUEST:
      return {
        ...state,
        isLoadingSubmitPassengerRatingForm: true,
      };

    case ratingTypes.SUBMIT_PASSENGER_RATING_FORM_SUCCESS:
      return {
        ...state,
        isLoadingSubmitPassengerRatingForm: false,
        submitPassengerRatingFormData: action.payload,
        submitPassengerRatingFormFail: "",
      };

    case ratingTypes.SUBMIT_PASSENGER_RATING_FORM_FAIL:
      return {
        ...state,
        isLoadingSubmitPassengerRatingForm: false,
        submitPassengerRatingFormData: [],
        submitPassengerRatingFormFail: action.payload,
      };

    // Submit the driver rating's form
    case ratingTypes.SUBMIT_DRIVER_RATING_FORM_REQUEST:
      return {
        ...state,
        isLoadingSubmitDriverRatingForm: true,
      };

    case ratingTypes.SUBMIT_DRIVER_RATING_FORM_SUCCESS:
      return {
        ...state,
        isLoadingSubmitDriverRatingForm: false,
        submitDriverRatingFormData: action.payload,
        submitDriverRatingFormFail: "",
      };

    case ratingTypes.SUBMIT_DRIVER_RATING_FORM_FAIL:
      return {
        ...state,
        isLoadingSubmitDriverRatingForm: false,
        submitDriverRatingFormData: [],
        submitDriverRatingFormFail: action.payload,
      };

    // Get a driver's ratings
    case ratingTypes.GET_DRIVER_RATINGS_REQUEST:
      return {
        ...state,
        isloadingDriverRatings: true,
      };

    case ratingTypes.GET_DRIVER_RATINGS_SUCCESS:
      return {
        ...state,
        isloadingDriverRatings: false,
        driverRatingsData: action.payload,
        driverRatingsError: "",
      };

    case ratingTypes.GET_DRIVER_RATINGS_FAIL:
      return {
        ...state,
        isloadingDriverRatings: false,
        driverRatingsData: {},
        driverRatingsError: action.payload,
      };

    // Get a passenger's ratings
    case ratingTypes.GET_PASSENGER_RATINGS_REQUEST:
      return {
        ...state,
        isloadingPassengerrRatings: true,
      };

    case ratingTypes.GET_PASSENGER_RATINGS_SUCCESS:
      return {
        ...state,
        isloadingPassengerrRatings: false,
        passengerRatingsData: action.payload,
        passengerRatingsError: "",
      };

    case ratingTypes.GET_PASSENGER_RATINGS_FAIL:
      return {
        ...state,
        isloadingPassengerrRatings: false,
        passengerRatingsData: {},
        passengerRatingsError: action.payload,
      };

    default:
      return state;
  }
}

export default ratingReducer;
