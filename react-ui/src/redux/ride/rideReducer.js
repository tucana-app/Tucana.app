import rideTypes from "./rideTypes";

const initialState = {
  isLoadingUserRidesList: false,
  userRidesListData: [],
  userRidesListError: "",

  isLoadingSubmitFormOfferRide: false,
  submitFormOfferRideSuccess: false,
  submitFormOfferRideFail: "",

  isloadingAllRidesList: false,
  allRidesListData: [],
  allRidesListError: "",
};

const rideReducer = (state = initialState, action) => {
  switch (action.type) {
    case rideTypes.GET_USER_RIDES_REQUEST:
      return {
        ...state,
        isLoadingUserRidesList: true,
      };

    case rideTypes.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        isLoadingUserRidesList: false,
        userRidesListData: action.payload,
        totalRidesDriverOnGoing: action.payload.length,
        userRidesListError: "",
      };

    case rideTypes.GET_USER_RIDES_FAIL:
      return {
        ...state,
        isLoadingUserRidesList: false,
        userRidesListData: [],
        userRidesListError: action.payload,
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: true,
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

    default:
      return state;
  }
};

export default rideReducer;
