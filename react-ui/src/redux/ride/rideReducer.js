import rideTypes from "./rideTypes";

const initialState = {
  isLoadingUserDriverRidesList: false,
  userRidesListData: [],
  userRidesListError: "",

  isLoadingSubmitFormOfferRide: false,
  submitFormOfferRideSuccess: false,
  submitFormOfferRideFail: "",

  isloadingAllRidesList: false,
  allRidesListData: [],
  allRidesListError: "",

  isloadingBookingRide: false,
  submitBookingRideSuccess: false,
  submitBookingRideError: "",

  isloadingUserRideBookingList: false,
  userRideBookingData: [],
  userRideBookingError: "",
};

const rideReducer = (state = initialState, action) => {
  switch (action.type) {
    case rideTypes.GET_USER_RIDES_REQUEST:
      return {
        ...state,
        isLoadingUserDriverRidesList: true,
      };

    case rideTypes.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        isLoadingUserDriverRidesList: false,
        userRidesListData: action.payload,
        totalRidesDriverOnGoing: action.payload.length,
        userRidesListError: "",
      };

    case rideTypes.GET_USER_RIDES_FAIL:
      return {
        ...state,
        isLoadingUserDriverRidesList: false,
        userRidesListData: [],
        userRidesListError: action.payload,
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: true,
        submitBookingRideSuccess: false,
        submitBookingRideError: "",
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_SUCCESS:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: false,
        submitFormOfferRideSuccess: true,
        submitFormOfferRideFail: "",
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_FAIL:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: false,
        submitFormOfferRideSuccess: false,
        submitFormOfferRideFail: action.payload,
      };

    case rideTypes.GET_ALL_RIDES_REQUEST:
      return {
        ...state,
        isloadingAllRidesList: true,
      };

    case rideTypes.GET_ALL_RIDES_SUCCESS:
      return {
        ...state,
        isloadingAllRidesList: false,
        allRidesListData: action.payload,
        allRidesListError: "",
      };

    case rideTypes.GET_ALL_RIDES_FAIL:
      return {
        ...state,
        isloadingAllRidesList: false,
        allRidesListData: [],
        allRidesListError: action.payload,
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_REQUEST:
      return {
        ...state,
        isloadingBookingRide: true,
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_SUCCESS:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideSuccess: true,
        submitBookingRideError: "",
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_FAIL:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideSuccess: false,
        submitBookingRideError: action.payload,
      };

    case rideTypes.GET_USER_RIDE_BOOKING_REQUEST:
      return {
        ...state,
        isloadingUserRideBookingList: true,
      };

    case rideTypes.GET_USER_RIDE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingUserRideBookingList: false,
        userRideBookingData: action.payload,
        userRideBookingError: "",
      };

    case rideTypes.GET_USER_RIDE_BOOKING_FAIL:
      return {
        ...state,
        isloadingUserRideBookingList: false,
        userRideBookingData: [],
        userRideBookingError: action.payload,
      };
    default:
      return state;
  }
};

export default rideReducer;
