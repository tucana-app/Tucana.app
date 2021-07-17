import rideTypes from "./rideTypes";

const initialState = {
  isLoadingRidesList: false,
  ridesListData: [],
  ridesListError: "",

  isLoadingSubmitFormOfferRide: false,
  submitFormOfferRideSuccess: false,
  submitFormOfferRideFail: "",
};

const rideReducer = (state = initialState, action) => {
  switch (action.type) {
    case rideTypes.GET_USER_RIDES_REQUEST:
      return {
        ...state,
        loadingRidesList: true,
      };

    case rideTypes.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        loadingRidesList: false,
        ridesListData: action.payload,
        totalRidesDriverOnGoing: action.payload.length,
        ridesListError: "",
      };

    case rideTypes.GET_USER_RIDES_FAIL:
      return {
        ...state,
        loadingRidesList: false,
        ridesListData: [],
        ridesListError: action.payload,
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

    default:
      return state;
  }
};

export default rideReducer;
